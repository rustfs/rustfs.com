#!/bin/bash
#
# RustFS Installation, Upgrade, and Uninstallation Script
set -euo pipefail

# --- Functions ---
err() { echo -e "\033[1;31m[ERROR]\033[0m $1" >&2; exit 1; }
info() { echo -e "\033[1;32m[INFO]\033[0m $1"; }

# --- Global Variables ---
RUSTFS_SERVICE_FILE="/usr/lib/systemd/system/rustfs.service"
RUSTFS_CONFIG_FILE="/etc/default/rustfs"
RUSTFS_BIN_PATH="/usr/local/bin/rustfs"
LOG_DIR="/var/logs/rustfs"
DOWNLOAD_CMD=""
PKG_GNU=""
PKG_MUSL=""
USE_MUSL=1
PORT_CMD=""

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

    # --- glibc Check (defaulting to MUSL) ---
    info "Defaulting to MUSL build for maximum compatibility."
}

# --- Download and Install Binary ---
download_and_install_binary() {
    info "Starting download and installation of RustFS binary..."
    ORIG_DIR=$(pwd)
    TMP_DIR=$(mktemp -d) || err "Failed to create temp dir."
    cd "$TMP_DIR" || err "Failed to enter temp dir."

    local PKG_URL
    if [[ $USE_MUSL -eq 1 ]]; then
      PKG_URL="$PKG_MUSL"
      info "Using MUSL build."
    else
      PKG_URL="$PKG_GNU"
      info "Using GNU build."
    fi

    info "Downloading RustFS package from $PKG_URL..."
    if [[ "$DOWNLOAD_CMD" == "wget" ]]; then
      wget -O rustfs.zip "$PKG_URL" || err "Download failed."
    else
      curl -L -o rustfs.zip "$PKG_URL" || err "Download failed."
    fi

    unzip rustfs.zip || err "Failed to unzip package."
    RUSTFS_BIN_FOUND=$(find . -type f -name rustfs | head -n1)
    [[ -z "$RUSTFS_BIN_FOUND" ]] && err "rustfs binary not found in package."

    cp "$RUSTFS_BIN_FOUND" "$RUSTFS_BIN_PATH" || err "Failed to copy binary to $RUSTFS_BIN_PATH."
    chmod +x "$RUSTFS_BIN_PATH" || err "Failed to set execute permission."

    cd "$ORIG_DIR" >/dev/null || true
    rm -rf "$TMP_DIR"
    info "RustFS binary installed successfully."
}

# --- Installation Logic ---
install_rustfs() {
    info "Starting RustFS installation..."

    if [ -f "$RUSTFS_BIN_PATH" ]; then
        err "RustFS appears to be already installed. Please use 'Upgrade' or 'Uninstall'."
    fi

    # --- Port Input & Check ---
    DEFAULT_RUSTFS_PORT=9000
    read -p "Please enter RustFS service port (default: $DEFAULT_RUSTFS_PORT): " RUSTFS_PORT
    RUSTFS_PORT=${RUSTFS_PORT:-$DEFAULT_RUSTFS_PORT}
    local PORT_OCCUPIED=0
    case "$PORT_CMD" in
      lsof) lsof -i :$RUSTFS_PORT >/dev/null 2>&1 && PORT_OCCUPIED=1 ;;
      netstat) netstat -ltn | grep -q ":$RUSTFS_PORT[[:space:]]" && PORT_OCCUPIED=1 ;;
      ss) ss -ltn | grep -q ":$RUSTFS_PORT[[:space:]]" && PORT_OCCUPIED=1 ;;
    esac
    [[ $PORT_OCCUPIED -eq 1 ]] && err "Port $RUSTFS_PORT is already in use."
    info "Port $RUSTFS_PORT is available."

    # --- Console Port Input & Check ---
    DEFAULT_CONSOLE_PORT=9001
    read -p "Please enter RustFS console port (default: $DEFAULT_CONSOLE_PORT): " CONSOLE_PORT
    CONSOLE_PORT=${CONSOLE_PORT:-$DEFAULT_CONSOLE_PORT}
    PORT_OCCUPIED=0
    case "$PORT_CMD" in
      lsof) lsof -i :$CONSOLE_PORT >/dev/null 2>&1 && PORT_OCCUPIED=1 ;;
      netstat) netstat -ltn | grep -q ":$CONSOLE_PORT[[:space:]]" && PORT_OCCUPIED=1 ;;
      ss) ss -ltn | grep -q ":$CONSOLE_PORT[[:space:]]" && PORT_OCCUPIED=1 ;;
    esac
    [[ $PORT_OCCUPIED -eq 1 ]] && err "Port $CONSOLE_PORT is already in use."
    info "Port $CONSOLE_PORT is available."

    # --- Data Directory Input ---
    DEFAULT_RUSTFS_VOLUME="/data/rustfs0"
    echo "Tip: You can use TAB for path completion."
    read -e -p "Please enter data storage directory (default: $DEFAULT_RUSTFS_VOLUME): " RUSTFS_VOLUME
    RUSTFS_VOLUME=${RUSTFS_VOLUME:-$DEFAULT_RUSTFS_VOLUME}
    [[ -z "$RUSTFS_VOLUME" ]] && err "No data directory provided."
    [[ ! -d "$RUSTFS_VOLUME" ]] && mkdir -p "$RUSTFS_VOLUME" || true
    [[ ! -d "$RUSTFS_VOLUME" ]] && err "Failed to create directory $RUSTFS_VOLUME."
    info "Data directory ready: $RUSTFS_VOLUME."

    # --- Log Directory ---
    [[ ! -d "$LOG_DIR" ]] && mkdir -p "$LOG_DIR" || true
    [[ ! -d "$LOG_DIR" ]] && err "Failed to create log directory $LOG_DIR."
    info "Log directory ready: $LOG_DIR."

    # --- Download & Install ---
    download_and_install_binary

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
ExecStart=$RUSTFS_BIN_PATH  \$RUSTFS_VOLUMES
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
StandardOutput=append:$LOG_DIR/rustfs.log
StandardError=append:$LOG_DIR/rustfs-err.log
[Install]
WantedBy=multi-user.target
EOF
    info "systemd service file created at $RUSTFS_SERVICE_FILE."

    # --- RustFS Config File ---
    cat <<EOF > "$RUSTFS_CONFIG_FILE" || err "Failed to write config file."
RUSTFS_ACCESS_KEY=rustfsadmin
RUSTFS_SECRET_KEY=rustfsadmin
RUSTFS_VOLUMES="$RUSTFS_VOLUME"
RUSTFS_ADDRESS=":$RUSTFS_PORT"
RUSTFS_CONSOLE_ADDRESS=":$CONSOLE_PORT"
RUSTFS_CONSOLE_ENABLE=true
RUST_LOG=warn
RUSTFS_OBS_LOG_DIRECTORY="$LOG_DIR/"
EOF
    info "RustFS config file created at $RUSTFS_CONFIG_FILE."

    # --- systemctl Operations ---
    systemctl daemon-reload || err "systemctl daemon-reload failed."
    systemctl enable rustfs || err "systemctl enable rustfs failed."
    systemctl start rustfs || err "systemctl start rustfs failed."
    info "RustFS service enabled and started."

    echo "RustFS has been installed and started successfully!"
    echo "Service port: $RUSTFS_PORT,  Console port: $CONSOLE_PORT,  Data directory: $RUSTFS_VOLUME"
}

# --- Upgrade Logic ---
upgrade_rustfs() {
    info "Starting RustFS upgrade..."
    if [ ! -f "$RUSTFS_BIN_PATH" ]; then
        err "RustFS is not installed. Please run the install command first."
    fi

    info "Stopping RustFS service..."
    systemctl stop rustfs || err "Failed to stop rustfs service."

    download_and_install_binary

    info "Restarting RustFS service..."
    systemctl daemon-reload || err "systemctl daemon-reload failed."
    systemctl enable rustfs || err "systemctl enable rustfs failed."
    systemctl start rustfs || err "Failed to start rustfs service."

    info "RustFS has been upgraded successfully."
}

# --- Uninstallation Logic ---
uninstall_rustfs() {
    info "Starting RustFS uninstallation..."
    read -p "Are you sure you want to uninstall RustFS? This will remove the binary, service file, and configuration. [y/N]: " confirmation
    if [[ ! "$confirmation" =~ ^[yY]([eE][sS])?$ ]]; then
        info "Uninstallation cancelled."
        exit 0
    fi

    # Check if the service file exists
    if [ -f "$RUSTFS_SERVICE_FILE" ]; then
        info "Stopping RustFS service..."
        systemctl stop rustfs || info "RustFS service was not running."
        info "Disabling RustFS service..."
        systemctl disable rustfs || info "RustFS service was not enabled."
    fi

    if [ -f "$RUSTFS_SERVICE_FILE" ]; then
        info "Removing systemd service file..."
        rm -f "$RUSTFS_SERVICE_FILE" || err "Failed to remove service file."
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
    read -p "Enter your choice [1-3]: " choice

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
