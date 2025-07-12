// Download link configuration
export const DOWNLOAD_CONFIG = {
  GITHUB_REPO: 'rustfs/rustfs',
  GITHUB_API_BASE: 'https://api.github.com/repos/rustfs/rustfs',
  RELEASE_PAGE: 'https://github.com/rustfs/rustfs/releases'
} as const

// System identifier configuration
export const SYSTEM_CONFIG = {
  WINDOWS: 'windows',
  LINUX: 'linux',
  MACOS: 'macos',
  DOCKER: 'docker'
} as const

// Version selection options
export const VERSION_CONFIG = {
  LATEST: 'latest',
  STABLE: 'stable',
  ALPHA: 'alpha',
  NIGHTLY: 'nightly'
} as const

// Download option key type
export type DownloadOptionKey = 'windows' | 'macos' | 'linux' | 'docker' | 'fallback';

// Download option interface
export interface DownloadOption {
  key: DownloadOptionKey;
  label: string;
  description: string;
}

// App configuration
export const appConfig = {
  downloads: {
    windows: 'https://dl.rustfs.com/artifacts/rustfs/rustfs-windows-x86_64-latest.zip',
    macos: 'https://dl.rustfs.com/artifacts/rustfs/rustfs-darwin-x86_64-latest.zip',
    linux: 'https://dl.rustfs.com/artifacts/rustfs/rustfs-linux-x86_64-latest.zip',
    docker: 'https://hub.docker.com/r/rustfs/rustfs',
    fallback: 'https://github.com/rustfs/rustfs/releases'
  },
  downloadOptions: [
    {
      key: 'windows' as DownloadOptionKey,
      label: 'Windows',
      description: 'For Windows 10/11'
    },
    {
      key: 'macos' as DownloadOptionKey,
      label: 'macOS',
      description: 'For macOS 10.15+'
    },
    {
      key: 'linux' as DownloadOptionKey,
      label: 'Linux',
      description: 'For various Linux distributions'
    },
    {
      key: 'docker' as DownloadOptionKey,
      label: 'Docker',
      description: 'Deploy using Docker containers'
    },
    {
      key: 'fallback' as DownloadOptionKey,
      label: 'Other Platforms',
      description: 'View all available versions'
    }
  ]
} as const;
