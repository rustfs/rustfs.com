import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import React from "react";

// One-click installation script constants
const ONE_CLICK_INSTALL_SCRIPT = "curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh";

// Unified Note type definition
export interface Note {
  type: "info" | "warning" | "success" | "tip";
  content: {
    zh: string;
    en: string;
    tr: string;
  };
  url?: string;
}

export interface PlatformInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: {
    zh: string;
    en: string;
    tr: string;
  };
  available: boolean;
  comingSoon?: boolean;
  variants?: PlatformVariant[];
  brewConfig?: brewConfig[];
  installScript?: string;
  notes?: Note[];
}

export interface PlatformVariant {
  name: string;
  architecture: string;
  downloadUrl: string;
  commands: string[];
  notes?: Note[];
}

export interface brewConfig {
  commands: string[];
  notes?: Note[];
}

export const platforms: PlatformInfo[] = [
  {
    id: "linux",
    name: "Linux",
    icon: <LinuxIcon className="w-6 h-6" />,
    description: {
      zh: "适用于各种 Linux 发行版",
      en: "For various Linux distributions",
      tr: "Çeşitli Linux dağıtımları için",
    },
    available: true,
    variants: [
      {
        name: "x86_64",
        architecture: "x86_64",
        downloadUrl: "https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-latest.zip",
        commands: [
          "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-latest.zip",
          "unzip rustfs-linux-x86_64-latest.zip",
          "./rustfs --version",
        ],
      },
      {
        name: "aarch64",
        architecture: "aarch64",
        downloadUrl: "https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-latest.zip",
        commands: [
          "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-latest.zip",
          "unzip rustfs-linux-aarch64-latest.zip",
          "./rustfs --version",
        ],
        notes: [
          {
            type: "info",
            content: {
              zh: "适用于 ARM64 架构（树莓派、云服务器等），功耗更低",
              en: "For ARM64 architecture (Raspberry Pi, cloud servers, etc.) with lower power consumption",
              tr: "ARM64 mimarisi için (Raspberry Pi, bulut sunucuları vb.) daha düşük güç tüketimi ile",
            },
          },
        ],
      },
    ],
    installScript: ONE_CLICK_INSTALL_SCRIPT,
    notes: [
      {
        type: "info",
        content: {
          zh: "查看详细安装文档",
          en: "View detailed installation guide",
          tr: "Detaylı kurulum kılavuzunu görüntüleyin",
        },
        url: "https://docs.rustfs.com/installation/linux",
      },
    ],
  },
  {
    id: "docker",
    name: "Docker",
    icon: <DockerIcon className="w-6 h-6" />,
    description: {
      zh: "使用 Docker 容器快速部署",
      en: "Quick deployment using Docker containers",
      tr: "Docker konteynerları kullanarak hızlı dağıtım",
    },
    available: true,
    variants: [
      {
        name: "最新稳定版 (latest)",
        architecture: "latest",
        downloadUrl: "https://hub.docker.com/r/rustfs/rustfs",
        commands: [
          "docker pull rustfs/rustfs:latest",
          "docker run -d \\",
          "  --name rustfs \\",
          "  -p 9000:9000 \\",
          "  -v /data:/data \\",
          "  rustfs/rustfs:latest",
        ],
      },
      {
        name: "最新 Alpha 版本 (alpha)",
        architecture: "alpha",
        downloadUrl: "https://hub.docker.com/r/rustfs/rustfs/tags",
        commands: [
          "docker pull rustfs/rustfs:alpha",
          "docker run -d \\",
          "  --name rustfs-alpha \\",
          "  -p 9000:9000 \\",
          "  -v /data:/data \\",
          "  rustfs/rustfs:alpha",
        ],
        notes: [
          {
            type: "warning",
            content: {
              zh: "开发测试版本，包含最新功能但可能不稳定",
              en: "Development version with latest features but may be unstable",
              tr: "En son özelliklere sahip geliştirme sürümü ancak kararsız olabilir",
            },
          },
        ],
      },
      {
        name: "指定版本 (1.0.0-alpha.18)",
        architecture: "1.0.0-alpha.18",
        downloadUrl: "https://hub.docker.com/r/rustfs/rustfs/tags",
        commands: [
          "docker pull rustfs/rustfs:1.0.0-alpha.18",
          "docker run -d \\",
          "  --name rustfs-v1-0-0-alpha-18 \\",
          "  -p 9000:9000 \\",
          "  -v /data:/data \\",
          "  rustfs/rustfs:1.0.0-alpha.18",
        ],
      },
      {
        name: "每日构建版 (nightly)",
        architecture: "nightly",
        downloadUrl: "https://hub.docker.com/r/rustfs/rustfs/tags",
        commands: [
          "docker pull rustfs/rustfs:nightly",
          "docker run -d \\",
          "  --name rustfs-nightly \\",
          "  -p 9000:9000 \\",
          "  -v /data:/data \\",
          "  rustfs/rustfs:nightly",
        ],
        notes: [
          {
            type: "warning",
            content: {
              zh: "每日构建版本，极不稳定，仅供尝鲜使用",
              en: "Daily builds, highly unstable, for early testing only",
              tr: "Günlük yapılar, son derece kararsız, sadece erken test için",
            },
          },
        ],
      },
    ],
    notes: [
      {
        type: "info",
        content: {
          zh: "查看所有可用版本",
          en: "View all available versions",
          tr: "Tüm mevcut sürümleri görüntüleyin",
        },
        url: "https://hub.docker.com/r/rustfs/rustfs/tags",
      },
      {
        type: "success",
        content: {
          zh: "Docker 快速开始指南",
          en: "Docker quick start guide",
          tr: "Docker hızlı başlangıç kılavuzu",
        },
        url: "https://docs.rustfs.com/installation/docker",
      },
    ],
  },
  {
    id: "macos",
    name: "macOS",
    icon: <AppleIcon className="w-6 h-6" />,
    description: {
      zh: "适用于 macOS 10.15 及更新版本",
      en: "For macOS 10.15 and later versions",
      tr: "macOS 10.15 ve sonraki sürümler için",
    },
    available: true,
    variants: [
      {
        name: "Apple Silicon (M1/M2)",
        architecture: "aarch64",
        downloadUrl: "https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-aarch64-latest.zip",
        commands: [
          "curl --progress-bar -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-aarch64-latest.zip",
          "unzip rustfs-darwin-aarch64-latest.zip",
          "chmod +x rustfs",
          "./rustfs --version",
        ],
        notes: [
          {
            type: "tip",
            content: {
              zh: "针对 Apple Silicon 优化，支持 M 系列芯片",
              en: "Optimized for Apple Silicon, supports M series chips",
              tr: "Apple Silicon için optimize edilmiş, M serisi çipleri destekler",
            },
          },
        ],
      },
      {
        name: "Intel (x86_64)",
        architecture: "x86_64",
        downloadUrl: "https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-x86_64-latest.zip",
        commands: [
          "curl --progress-bar -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-x86_64-latest.zip",
          "unzip rustfs-darwin-x86_64-latest.zip",
          "chmod +x rustfs",
          "./rustfs --version",
        ],
      },
    ],
    brewConfig: [
      {
        commands: ["brew tap rustfs/homebrew-tap", "brew install rustfs", "rustfs --version"],
        notes: [
          {
            type: "info",
            content: {
              zh: "请先确保已安装 [Homebrew]",
              en: "Please ensure that [Homebrew] is installed first",
              tr: "Lütfen önce [Homebrew]'un yüklü olduğundan emin olun",
            },
            url: "https://brew.sh/",
          },
        ],
      },
    ],
    notes: [
      {
        type: "info",
        content: {
          zh: "查看 macOS 安装指南",
          en: "View macOS installation guide",
          tr: "macOS kurulum kılavuzunu görüntüleyin",
        },
        url: "https://docs.rustfs.com/installation/macos",
      },
    ],
  },
  {
    id: "windows",
    name: "Windows",
    icon: <WindowsIcon className="w-6 h-6" />,
    description: {
      zh: "适用于 Windows 10 及更新版本",
      en: "For Windows 10 and later versions",
      tr: "Windows 10 ve sonraki sürümler için",
    },
    available: false,
    comingSoon: true,
  },
];

export const getAvailablePlatforms = () => platforms.filter((p) => p.available);
export const getComingSoonPlatforms = () => platforms.filter((p) => p.comingSoon);
export const getAllPlatforms = () => platforms;
export const getPlatformById = (id: string) => platforms.find((p) => p.id === id);
