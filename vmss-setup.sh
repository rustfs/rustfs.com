#!/bin/bash
# ============================================
# 脚本功能：
# - 安装基础工具 (az / ansible / gh / docker，已存在则跳过)
# - 写入 /etc/ansible/ansible.cfg (关闭 host key 检查)
# - 获取 Azure VMSS 内网 IP
# - 生成 SSH 别名配置文件 (~/.ssh/config)
# - 更新 /etc/hosts、/etc/ansible/hosts
# ============================================

# 配置变量
RESOURCE_GROUP="rustfs-zhigang-rg"
VMSS_NAME="RustFSZhiGang"
JUMPBOX_USER="azureuser"       # 跳板机用户名
SSH_KEY_PATH="$HOME/.ssh/id_rsa_terraform"  # 用于跳板机登录的私钥
SSH_CONFIG_FILE="$HOME/.ssh/config"  # 输出 SSH config
HOSTS_FILE="/etc/hosts"
ANSIBLE_HOSTS_FILE="/etc/ansible/hosts"
ANSIBLE_CFG_FILE="/etc/ansible/ansible.cfg"

# -------------------------------
# 工具安装函数
# -------------------------------

install_az() {
    echo "==> 安装 Azure CLI (az) ..."
    curl -fsSL 'https://azurecliprod.blob.core.windows.net/$root/deb_install.sh' | sudo bash
}

install_ansible() {
    echo "==> 安装 Ansible ..."
    sudo apt update
    sudo apt install -y software-properties-common
    sudo add-apt-repository --yes --update ppa:ansible/ansible
    sudo apt install -y ansible
}

install_gh() {
    echo "==> 安装 GitHub CLI (gh) ..."
    (type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
        && sudo mkdir -p -m 755 /etc/apt/keyrings \
        && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        && cat "$out" | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
        && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
        && sudo mkdir -p -m 755 /etc/apt/sources.list.d \
        && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
        && sudo apt update \
        && sudo apt install gh -y
}

install_docker() {
    echo "==> 安装 Docker ..."
    # Add Docker's official GPG key:
    sudo apt update
    sudo apt install -y ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
}

# -------------------------------
# 1. 检查并安装基础工具（存在则跳过）
# -------------------------------
echo "==> 检查基础工具 ..."

# az 最先安装，后面查询 VMSS IP 依赖它
if command -v az >/dev/null 2>&1; then
    echo "✅ az 已安装，跳过: $(az --version | head -n 1)"
else
    install_az
fi

if command -v ansible >/dev/null 2>&1; then
    echo "✅ ansible 已安装，跳过: $(ansible --version | head -n 1)"
else
    install_ansible
fi

if command -v gh >/dev/null 2>&1; then
    echo "✅ gh 已安装，跳过: $(gh --version | head -n 1)"
else
    install_gh
fi

if command -v docker >/dev/null 2>&1; then
    echo "✅ docker 已安装，跳过: $(docker --version)"
else
    install_docker
fi

# -------------------------------
# 2. 写入 /etc/ansible/ansible.cfg
# -------------------------------
echo "==> 写入 $ANSIBLE_CFG_FILE ..."
sudo mkdir -p "$(dirname "$ANSIBLE_CFG_FILE")"
if [ -f "$ANSIBLE_CFG_FILE" ]; then
    sudo cp "$ANSIBLE_CFG_FILE" "${ANSIBLE_CFG_FILE}.bak_vmss"
fi
sudo tee "$ANSIBLE_CFG_FILE" > /dev/null <<EOF
[defaults]
host_key_checking = False
EOF
echo "✅ $ANSIBLE_CFG_FILE 配置完成"

# -------------------------------
# 3. 获取 VMSS 实例内网 IP
# -------------------------------
echo "==> 获取 VMSS 实例内网 IP ..."
IPS=$(az vmss nic list \
        --resource-group "$RESOURCE_GROUP" \
        --vmss-name "$VMSS_NAME" \
        --query "[].ipConfigurations[0].privateIPAddress" \
        -o tsv)

echo "......$IPS......"

if [ -z "$IPS" ]; then
    echo "❌ 未找到 VMSS 内网 IP，请检查资源组或 VMSS 名称"
    exit 1
fi

echo "==> 找到 $(echo "$IPS" | wc -l) 个实例内网 IP"
echo "==> 生成 SSH 配置文件到 $SSH_CONFIG_FILE"

# 备份旧配置
[ -f "$SSH_CONFIG_FILE" ] && mv "$SSH_CONFIG_FILE" "${SSH_CONFIG_FILE}.bak"

# 写入 SSH 配置
count=0
for ip in $IPS; do
    printf "\nHost vm%03d\n" "$count" >> "$SSH_CONFIG_FILE"
    echo "    HostName $ip" >> "$SSH_CONFIG_FILE"
    echo "    Port 22" >> "$SSH_CONFIG_FILE"
    echo "    User $JUMPBOX_USER" >> "$SSH_CONFIG_FILE"
    echo "    IdentityFile $SSH_KEY_PATH" >> "$SSH_CONFIG_FILE"
    count=$((count + 1))
done

echo "✅ SSH 配置完成"

# -------------------------------
# 4. 更新 /etc/hosts
# -------------------------------
echo "==> 更新 $HOSTS_FILE ... (需要 sudo)"
sudo cp "$HOSTS_FILE" "${HOSTS_FILE}.bak_vmss"

# 清理旧条目，避免重复运行时叠加
sudo sed -i '/rustfs-node[0-9]*/d' "$HOSTS_FILE"

count=1
for ip in $IPS; do
    echo "$ip rustfs-node$count" | sudo tee -a "$HOSTS_FILE" > /dev/null
    count=$((count + 1))
done

echo "✅ /etc/hosts 更新完成"

# -------------------------------
# 5. 更新 /etc/ansible/hosts
# -------------------------------
if [ -f "$ANSIBLE_HOSTS_FILE" ]; then
    echo "==> 更新 $ANSIBLE_HOSTS_FILE ... (需要 sudo)"
    sudo cp "$ANSIBLE_HOSTS_FILE" "${ANSIBLE_HOSTS_FILE}.bak_vmss"

    # 覆盖重写 [testing] 分组，避免重复运行时叠加
    {
        echo "[testing]"
        for ip in $IPS; do
            echo "$ip ansible_python_interpreter=/usr/bin/python3 ansible_user=$JUMPBOX_USER ansible_ssh_private_key_file=$SSH_KEY_PATH"
        done
    } | sudo tee "$ANSIBLE_HOSTS_FILE" > /dev/null

    echo "✅ /etc/ansible/hosts 更新完成"
else
    echo "⚠️ $ANSIBLE_HOSTS_FILE 不存在，跳过 ansible hosts 更新"
fi

echo "✅ 全部完成！"
