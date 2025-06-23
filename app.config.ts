export const appConfig = {
  // 下载链接配置
  downloads: {
    macos: "https://github.com/rustfs/rustfs/releases/latest/download/rustfs-macos.dmg",
    windows: "https://github.com/rustfs/rustfs/releases/latest/download/rustfs-windows.exe",
    linux: "https://github.com/rustfs/rustfs/releases/latest/download/rustfs-linux.tar.gz",
    fallback: "https://docs.rustfs.com/download"
  },

  // 系统标识配置
  systemNames: {
    macos: "macOS",
    windows: "Windows",
    linux: "Linux",
    fallback: "下载"
  },

  // 版本选择选项
  downloadOptions: [
    {
      key: "macos",
      label: "macOS",
      description: "适用于 Mac 用户",
    },
    {
      key: "windows",
      label: "Windows",
      description: "适用于 Windows 用户",
    },
    {
      key: "linux",
      label: "Linux",
      description: "适用于 Linux 用户",
    },
    {
      key: "fallback",
      label: "其他平台",
      description: "查看所有下载选项",
    }
  ]
};

export type AppConfig = typeof appConfig;
export type DownloadOptionKey = keyof typeof appConfig.downloads;
