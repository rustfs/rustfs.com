#!/bin/bash
#
# RustFS Elegant Installation Script
set -euo pipefail

# --- Functions ---
err() { echo -e "\033[1;31m[ERROR]\033[0m $1" >&2; exit 1; }
info() { echo -e "\033[1;32m[INFO]\033[0m $1"; }

# --- Root Check ---
if [[ $EUID -ne 0 ]]; then
  err "This script must be run as root. Please use sudo or switch to the root user."
fi

# --- Command Check ---
REQUIRED_CMDS=(unzip systemctl mktemp grep sort ldd find)
PORT_CHECK_CMDS=(lsof netstat ss)
DOWNLOAD_CMDS=(wget curl)
MISSING_CMDS=()
PORT_CMD=""
DOWNLOAD_CMD=""

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
    CPU_ARCH="x86_64"
    PKG_X86="https://dl.rustfs.com/artifacts/rustfs/rustfs-release-x86_64-unknown-linux-gnu.zip"
    PKG_MUSL="https://dl.rustfs.com/artifacts/rustfs/rustfs-release-x86_64-unknown-linux-musl.latest.zip"
    ;;
  aarch64)
    CPU_ARCH="aarch64"
    PKG_MUSL="https://dl.rustfs.com/artifacts/rustfs/rustfs-release-aarch64-unknown-linux-musl.latest.zip"
    ;;
  *) err "Unsupported CPU architecture: $ARCH";;
esac
info "OS and architecture check passed: $ARCH."

# --- glibc Check (x86_64) ---
USE_MUSL=1
# glibc_ver=""
# if [[ "$CPU_ARCH" == "x86_64" ]]; then
#   if command -v ldd >/dev/null 2>&1; then
#     glibc_ver=$(ldd --version | head -n1 | grep -oE '[0-9]+\.[0-9]+')
#     min_ver=2.17
#     [[ $(echo -e "$glibc_ver\n$min_ver" | sort -V | head -n1) != "$min_ver" ]] && USE_MUSL=1
#   else
#     USE_MUSL=1
#   fi
# fi
# info "glibc check complete."

# --- Port Input & Check ---
DEFAULT_RUSTFS_PORT=9000
read -p "Please enter RustFS service port (default: $DEFAULT_RUSTFS_PORT): " RUSTFS_PORT
RUSTFS_PORT=${RUSTFS_PORT:-$DEFAULT_RUSTFS_PORT}
PORT_OCCUPIED=0
case "$PORT_CMD" in
  lsof) lsof -i :$RUSTFS_PORT >/dev/null 2>&1 && PORT_OCCUPIED=1 ;;
  netstat) netstat -ltn | grep -q ":$RUSTFS_PORT[[:space:]]" && PORT_OCCUPIED=1 ;;
  ss) ss -ltn | grep -q ":$RUSTFS_PORT[[:space:]]" && PORT_OCCUPIED=1 ;;
esac
[[ $PORT_OCCUPIED -eq 1 ]] && err "Port $RUSTFS_PORT is already in use."
info "Port $RUSTFS_PORT is available."

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
LOG_DIR="/var/logs/rustfs"
[[ ! -d "$LOG_DIR" ]] && mkdir -p "$LOG_DIR" || true
[[ ! -d "$LOG_DIR" ]] && err "Failed to create log directory $LOG_DIR."
info "Log directory ready: $LOG_DIR."

# --- Download & Extract ---
TMP_DIR=$(mktemp -d) || err "Failed to create temp dir."
cd $TMP_DIR || err "Failed to enter temp dir."
if [[ "$CPU_ARCH" == "x86_64" ]]; then
  [[ $USE_MUSL -eq 1 ]] && PKG_URL="$PKG_MUSL" || PKG_URL="$PKG_X86"
else
  PKG_URL="$PKG_MUSL"
fi
info "Downloading RustFS package..."
if [[ "$DOWNLOAD_CMD" == "wget" ]]; then
  wget -O rustfs.zip "$PKG_URL" || err "Download failed."
else
  curl -L -o rustfs.zip "$PKG_URL" || err "Download failed."
fi
unzip rustfs.zip || err "Failed to unzip package."
RUSTFS_BIN=$(find . -type f -name rustfs | head -n1)
[[ -z "$RUSTFS_BIN" ]] && err "rustfs binary not found in package."
cp "$RUSTFS_BIN" /usr/local/bin/rustfs || err "Failed to copy binary."
chmod +x /usr/local/bin/rustfs || err "Failed to set execute permission."
cd - >/dev/null; rm -rf $TMP_DIR
info "RustFS binary installed."

# --- systemd Service File ---
cat <<EOF > /usr/lib/systemd/system/rustfs.service || err "Failed to write systemd service file."
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
EnvironmentFile=-/etc/default/rustfs
ExecStart=/usr/local/bin/rustfs  \$RUSTFS_VOLUMES
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
ProtectSystem=full
ProtectHome=true
PrivateTmp=true
PrivateDevices=true
ProtectClock=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictSUIDSGID=true
RestrictRealtime=true
StandardOutput=append:/var/logs/rustfs/rustfs.log
StandardError=append:/var/logs/rustfs/rustfs-err.log
[Install]
WantedBy=multi-user.target
EOF
info "systemd service file created."

# --- RustFS Config File ---
cat <<EOF > /etc/default/rustfs || err "Failed to write config file."
RUSTFS_ROOT_USER=rustfsadmin
RUSTFS_ROOT_PASSWORD=rustfsadmin
RUSTFS_VOLUMES="$RUSTFS_VOLUME"
RUSTFS_ADDRESS=":$RUSTFS_PORT"
RUSTFS_CONSOLE_ADDRESS=":9001"
RUSTFS_CONSOLE_ENABLE=true
RUST_LOG=warn
RUSTFS_OBS_LOG_DIRECTORY="$LOG_DIR/"
EOF
info "RustFS config file created."

# --- systemctl Operations ---
systemctl daemon-reload || err "systemctl daemon-reload failed."
systemctl enable rustfs || err "systemctl enable rustfs failed."
systemctl start rustfs || err "systemctl start rustfs failed."
info "RustFS service enabled and started."

echo "RustFS has been installed and started successfully!"
echo "Service port: $RUSTFS_PORT, Data directory: $RUSTFS_VOLUME"
