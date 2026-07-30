#!/bin/bash
#
# RustFS Installation, Upgrade, and Uninstallation Script
set -euo pipefail

# --- Functions ---
err() { echo -e "\033[1;31m[ERROR]\033[0m $1" >&2; exit 1; }
info() { echo -e "\033[1;32m[INFO]\033[0m $1"; }

# --- Global Variables ---
RUSTFS_SERVICE_FILE="/etc/systemd/system/rustfs.service"
LEGACY_SERVICE_FILE="/usr/lib/systemd/system/rustfs.service"
RUSTFS_CONFIG_FILE="/etc/default/rustfs"
RUSTFS_BIN_PATH="/usr/local/bin/rustfs"
LOG_DIR="/var/log/rustfs"
DOWNLOAD_CMD=""
PKG_URL=""
PKG_GNU=""
PKG_MUSL=""
MIN_GLIBC_VERSION="2.31"
PORT_CMD=""
TMP_DIR=""
RUSTFS_BIN_FOUND=""

version_ge() {
        local version="$1"
        local minimum="$2"
        [[ "$(printf '%s\n%s\n' "$minimum" "$version" | sort -V | head -n1)" == "$minimum" ]]
}

detect_glibc_version() {
        local version=""
        local gnu_libc=""

        if command -v getconf >/dev/null 2>&1; then
            gnu_libc=$(getconf GNU_LIBC_VERSION 2>/dev/null || true)
            version="${gnu_libc##* }"
        fi

        if [[ -z "$version" || "$version" == "$gnu_libc" ]]; then
            version=$(ldd --version 2>&1 | head -n1 | grep -oE '[0-9]+(\.[0-9]+)+' | tail -n1 || true)
        fi

        echo "$version"
}

select_package_url() {
        local glibc_version=""

        glibc_version=$(detect_glibc_version)
        if [[ -n "$glibc_version" ]] && version_ge "$glibc_version" "$MIN_GLIBC_VERSION"; then
            PKG_URL="$PKG_GNU"
            info "Detected glibc $glibc_version (>= $MIN_GLIBC_VERSION); using GNU build."
        else
            PKG_URL="$PKG_MUSL"
            if [[ -n "$glibc_version" ]]; then
                info "Detected glibc $glibc_version (< $MIN_GLIBC_VERSION); using MUSL build for compatibility."
            else
                info "glibc not detected; using MUSL build for compatibility."
            fi
        fi
}

# --- Pre-flight Checks ---
run_preflight_checks() {
    # --- Root Check ---
    if [[ $EUID -ne 0 ]]; then
      err "This script must be run as root. Please use sudo or switch to the root user."
    fi

    # --- Command Check ---
    REQUIRED_CMDS=(unzip systemctl mktemp grep sort find)
    PORT_CHECK_CMDS=(lsof netstat ss)
    DOWNLOAD_CMDS=(wget curl)
    MISSING_CMDS=()

    for cmd in "${REQUIRED_CMDS[@]}"; do
      command -v "$cmd" >/dev/null 2>&1 || MISSING_CMDS+=("$cmd")
    done
    for cmd in "${PORT_CHECK_CMDS[@]}"; do
      if command -v "$cmd" >/dev/null 2>&1; then PORT_CMD="$cmd"; break; fi
    done
    for cmd in "${DOWNLOAD_CMDS[@]}"; do
      if command -v "$cmd" >/dev/null 2>&1; then DOWNLOAD_CMD="$cmd"; break; fi
    done
    [[ ${#MISSING_CMDS[@]} -ne 0 ]] && err "Missing commands: ${MISSING_CMDS[*]}"
    [[ -z "$PORT_CMD" ]] && err "No port check command found (lsof/netstat/ss)"
    [[ -z "$DOWNLOAD_CMD" ]] && err "No download command found (wget/curl)"
    info "All required commands are present."

    # --- OS & Arch Check ---
    [[ "$(uname -s)" != "Linux" ]] && err "This script is only for Linux."
    ARCH=$(uname -m)
    case "$ARCH" in
      x86_64)
                PKG_GNU="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-gnu-latest.zip"
                PKG_MUSL="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip"
        ;;
      aarch64)
                PKG_GNU="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-gnu-latest.zip"
                PKG_MUSL="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip"
        ;;
      *) err "Unsupported CPU architecture: $ARCH";;
    esac
    info "OS and architecture check passed: $ARCH."
        select_package_url
}

# --- Port Validation & Availability Check ---
check_port() {
    local port="$1"
    [[ "$port" =~ ^[0-9]+$ ]] || err "Invalid port: $port. Port must be a number."
    (( port >= 1 && port <= 65535 )) || err "Invalid port: $port. Port must be between 1 and 65535."
    local occupied=0
    case "$PORT_CMD" in
      lsof) lsof -i ":$port" >/dev/null 2>&1 && occupied=1 ;;
      netstat) netstat -ltn | grep -q ":${port}[[:space:]]" && occupied=1 ;;
      ss) ss -ltn | grep -q ":${port}[[:space:]]" && occupied=1 ;;
    esac
    [[ $occupied -eq 1 ]] && err "Port $port is already in use."
    info "Port $port is available."
}

# --- Download and Extract Package ---
download_rustfs_package() {
    info "Starting download of RustFS package..."
    TMP_DIR=$(mktemp -d) || err "Failed to create temp dir."
    trap 'rm -rf "$TMP_DIR"' EXIT

    info "Downloading RustFS package from $PKG_URL..."
    if [[ "$DOWNLOAD_CMD" == "wget" ]]; then
      wget --tries=3 -O "$TMP_DIR/rustfs.zip" "$PKG_URL" || err "Download failed."
    else
      curl -fL --retry 3 -o "$TMP_DIR/rustfs.zip" "$PKG_URL" || err "Download failed."
    fi

    unzip "$TMP_DIR/rustfs.zip" -d "$TMP_DIR/pkg" || err "Failed to unzip package."
    RUSTFS_BIN_FOUND=$(find "$TMP_DIR/pkg" -type f -name rustfs | head -n1)
    [[ -z "$RUSTFS_BIN_FOUND" ]] && err "rustfs binary not found in package."
    info "RustFS package downloaded and extracted."
}

# --- Install Extracted Binary ---
install_rustfs_binary() {
    cp "$RUSTFS_BIN_FOUND" "$RUSTFS_BIN_PATH" || err "Failed to copy binary to $RUSTFS_BIN_PATH."
    chmod +x "$RUSTFS_BIN_PATH" || err "Failed to set execute permission."
    info "RustFS binary installed at $RUSTFS_BIN_PATH."
}


# --- Installation Logic ---
install_rustfs() {
    info "Starting RustFS installation..."

    if [ -f "$RUSTFS_BIN_PATH" ]; then
        err "RustFS appears to be already installed. Please use 'Upgrade' or 'Uninstall'."
    fi

    # --- Port Input & Check ---
    DEFAULT_RUSTFS_PORT=9000
    read -r -p "Please enter RustFS service port (default: $DEFAULT_RUSTFS_PORT): " RUSTFS_PORT
    RUSTFS_PORT=${RUSTFS_PORT:-$DEFAULT_RUSTFS_PORT}
    check_port "$RUSTFS_PORT"

    # --- Console Port Input & Check ---
    DEFAULT_CONSOLE_PORT=9001
    read -r -p "Please enter RustFS console port (default: $DEFAULT_CONSOLE_PORT): " CONSOLE_PORT
    CONSOLE_PORT=${CONSOLE_PORT:-$DEFAULT_CONSOLE_PORT}
    [[ "$CONSOLE_PORT" == "$RUSTFS_PORT" ]] && err "Console port must be different from the service port ($RUSTFS_PORT)."
    check_port "$CONSOLE_PORT"

    # --- Data Directory Input ---
    DEFAULT_RUSTFS_VOLUME="/data/rustfs0"
    echo "Tip: You can use TAB for path completion."
    read -r -e -p "Please enter data storage directory (default: $DEFAULT_RUSTFS_VOLUME): " RUSTFS_VOLUME
    RUSTFS_VOLUME=${RUSTFS_VOLUME:-$DEFAULT_RUSTFS_VOLUME}
    [[ -z "$RUSTFS_VOLUME" ]] && err "No data directory provided."
    case "$RUSTFS_VOLUME" in
      /tmp|/tmp/*|/var/tmp|/var/tmp/*)
        err "Data directory cannot be under /tmp or /var/tmp because systemd PrivateTmp=true hides those paths from RustFS. Please use a persistent path such as $DEFAULT_RUSTFS_VOLUME."
        ;;
    esac
    [[ ! -d "$RUSTFS_VOLUME" ]] && mkdir -p "$RUSTFS_VOLUME" || true
    [[ ! -d "$RUSTFS_VOLUME" ]] && err "Failed to create directory $RUSTFS_VOLUME."
    info "Data directory ready: $RUSTFS_VOLUME."

    # --- Log Directory ---
    [[ ! -d "$LOG_DIR" ]] && mkdir -p "$LOG_DIR" || true
    [[ ! -d "$LOG_DIR" ]] && err "Failed to create log directory $LOG_DIR."
    info "Log directory ready: $LOG_DIR."

    # --- Download & Install ---
    download_rustfs_package
    install_rustfs_binary

    # --- systemd Service File ---
    cat <<EOF > "$RUSTFS_SERVICE_FILE" || err "Failed to write systemd service file."
[Unit]
Description=RustFS Object Storage Server
Documentation=https://rustfs.com/docs/
After=network-online.target
Wants=network-online.target
[Service]
Type=notify
NotifyAccess=main
User=root
Group=root
WorkingDirectory=/usr/local
EnvironmentFile=-$RUSTFS_CONFIG_FILE
ExecStart=$RUSTFS_BIN_PATH
LimitNOFILE=1048576
LimitNPROC=32768
TasksMax=infinity
Restart=always
RestartSec=10s
OOMScoreAdjust=-1000
SendSIGKILL=no
TimeoutStartSec=30s
TimeoutStopSec=30s
NoNewPrivileges=true
ProtectHome=true
PrivateTmp=true
PrivateDevices=true
ProtectClock=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictSUIDSGID=true
RestrictRealtime=true
[Install]
WantedBy=multi-user.target
EOF
    info "systemd service file created at $RUSTFS_SERVICE_FILE."

    # --- RustFS Config File ---
    cat <<EOF > "$RUSTFS_CONFIG_FILE" || err "Failed to write config file."
RUSTFS_ACCESS_KEY=<your access key>
RUSTFS_SECRET_KEY=<your secret key>
RUSTFS_VOLUMES="$RUSTFS_VOLUME"
RUSTFS_ADDRESS=":$RUSTFS_PORT"
RUSTFS_CONSOLE_ADDRESS=":$CONSOLE_PORT"
RUSTFS_CONSOLE_ENABLE=true
RUSTFS_OBS_LOGGER_LEVEL=error
RUSTFS_OBS_LOG_DIRECTORY="$LOG_DIR/"
EOF
    chmod 600 "$RUSTFS_CONFIG_FILE" || err "Failed to set permissions on config file."
    info "RustFS config file created at $RUSTFS_CONFIG_FILE."

    # --- systemctl Operations ---
    systemctl daemon-reload || err "systemctl daemon-reload failed."
    systemctl enable rustfs || err "systemctl enable rustfs failed."
    systemctl start rustfs || err "systemctl start rustfs failed."
    info "RustFS service enabled and started."

    echo ""
    echo "RustFS has been installed and started successfully!"
    echo "Service port: $RUSTFS_PORT,  Console port: $CONSOLE_PORT,  Data directory: $RUSTFS_VOLUME"
    echo ""
    echo -e "\033[1;33m[SECURITY WARNING]\033[0m Please change the default value for RUSTFS_ACCESS_KEY/RUSTFS_SECRET_KEY immediately and the value can't be rustfsadmin!"
    echo ""
    echo "  Config file: $RUSTFS_CONFIG_FILE"
    echo ""
    echo "To change them, run:"
    echo "  1. Edit $RUSTFS_CONFIG_FILE and update RUSTFS_ACCESS_KEY/RUSTFS_SECRET_KEY"
    echo "  2. systemctl restart rustfs"
}

# --- Upgrade Logic ---
upgrade_rustfs() {
    info "Starting RustFS upgrade..."
    if [ ! -f "$RUSTFS_BIN_PATH" ]; then
        err "RustFS is not installed. Please run the install command first."
    fi

    # Download the new version BEFORE stopping the service, so a failed
    # download does not leave the service down.
    download_rustfs_package

    local BACKUP_BIN="${RUSTFS_BIN_PATH}.bak"
    info "Backing up current binary to $BACKUP_BIN..."
    cp "$RUSTFS_BIN_PATH" "$BACKUP_BIN" || err "Failed to back up current binary."

    info "Stopping RustFS service..."
    systemctl stop rustfs || err "Failed to stop rustfs service."

    install_rustfs_binary

    info "Restarting RustFS service..."
    systemctl daemon-reload || err "systemctl daemon-reload failed."
    systemctl enable rustfs || err "systemctl enable rustfs failed."
    if ! systemctl start rustfs; then
        info "New binary failed to start. Rolling back to previous version..."
        cp -f "$BACKUP_BIN" "$RUSTFS_BIN_PATH" || err "Rollback failed. Previous binary is saved at $BACKUP_BIN."
        systemctl start rustfs || err "Rollback start failed. Please check logs in $LOG_DIR."
        err "Upgrade failed; the previous version has been restored and restarted."
    fi
    rm -f "$BACKUP_BIN"

    info "RustFS has been upgraded successfully."
}

# --- Uninstallation Logic ---
uninstall_rustfs() {
    info "Starting RustFS uninstallation..."
    read -r -p "Are you sure you want to uninstall RustFS? This will remove the binary, service file, and configuration. [y/N]: " confirmation
    if [[ ! "$confirmation" =~ ^[yY]([eE][sS])?$ ]]; then
        info "Uninstallation cancelled."
        exit 0
    fi

    # Check if the service file exists (current or legacy location)
    if [ -f "$RUSTFS_SERVICE_FILE" ] || [ -f "$LEGACY_SERVICE_FILE" ]; then
        info "Stopping RustFS service..."
        systemctl stop rustfs || info "RustFS service was not running."
        info "Disabling RustFS service..."
        systemctl disable rustfs || info "RustFS service was not enabled."
        info "Removing systemd service file..."
        rm -f "$RUSTFS_SERVICE_FILE" "$LEGACY_SERVICE_FILE" || err "Failed to remove service file."
        info "Reloading systemd daemon..."
        systemctl daemon-reload || err "systemctl daemon-reload failed."
        systemctl reset-failed || info "No failed units to reset."
    else
        info "Service file not found, skipping."
    fi

    if [ -f "$RUSTFS_CONFIG_FILE" ]; then
        info "Removing config file..."
        rm -f "$RUSTFS_CONFIG_FILE" || err "Failed to remove config file."
    else
        info "Config file not found, skipping."
    fi

    if [ -f "$RUSTFS_BIN_PATH" ]; then
        info "Removing RustFS binary..."
        rm -f "$RUSTFS_BIN_PATH" || err "Failed to remove binary."
    else
        info "Binary not found, skipping."
    fi

    info "RustFS has been uninstalled successfully."
    info "Note: Data directories and log files in $LOG_DIR are not removed automatically. Please remove them manually if desired."
}

# --- Main Logic ---
main() {
    run_preflight_checks

    echo "Please choose an option:"
    echo "1. Install RustFS"
    echo "2. Uninstall RustFS"
    echo "3. Upgrade RustFS"
    read -r -p "Enter your choice [1-3]: " choice

    case "$choice" in
        1)
            install_rustfs
            ;;
        2)
            uninstall_rustfs
            ;;
        3)
            upgrade_rustfs
            ;;
        *)
            err "Invalid choice. Please run the script again and select a number between 1 and 3."
            ;;
    esac
}

main "$@"
