'use client'

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CodeBlock from "../code-block";
import BinaryDownloadCard from "../common/binary-download-card";
import PlatformHeader from "../common/platform-header";
import NotesSection from "../notes-section";
import { type PlatformInfoData } from "./platform-info";

interface MacOSDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function MacOSDownloadSection({ platform, className }: MacOSDownloadSectionProps) {
  const t = useTranslations();

  // macOS 平台自己管理自己的数据
  const macosVariants = [
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
          type: "tip" as const,
          content: {
            zh: "RustFS 的初始化默认用户名和密码均为 rustfsadmin。建议安装完毕后对用户名和密码进行修改。",
            en: "The default username and password for RustFS are rustfsadmin. It is recommended to modify the username and password after installation.",
          },
        },
        {
          type: "tip" as const,
          content: {
            zh: "针对 Apple Silicon 优化，支持 M 系列芯片",
            en: "Optimized for Apple Silicon, supports M series chips",
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
      notes: [
        {
          type: "tip" as const,
          content: {
            zh: "RustFS 的初始化默认用户名和密码均为 rustfsadmin。建议安装完毕后对用户名和密码进行修改。",
            en: "The default username and password for RustFS are rustfsadmin. It is recommended to modify the username and password after installation.",
          },
        },
      ],
    },
  ];

  const brewConfig = [
    {
      commands: ["brew tap rustfs/homebrew-tap", "brew install rustfs", "rustfs --version"],
      notes: [
        {
          type: "info" as const,
          content: {
            zh: "请先确保已安装 [Homebrew]",
            en: "Please ensure that [Hombrew] is installed first",
          },
          url: "https://brew.sh/",
        },
      ],
    },
  ];

  const platformNotes = [
    {
      type: "tip" as const,
      content: {
        zh: "RustFS 的初始化默认用户名和密码均为 rustfsadmin。建议安装完毕后对用户名和密码进行修改。",
        en: "The default username and password for RustFS are rustfsadmin. It is recommended to modify the username and password after installation.",
      },
    },
    {
      type: "info" as const,
      content: {
        zh: "查看 macOS 安装指南",
        en: "View macOS installation guide",
      },
      url: "https://docs.rustfs.com/installation/macos",
    },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Homebrew Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{t('download.homebrewInstallation')}</h3>

        {brewConfig.map((brewConfig, index) => (
          <div key={index} className="space-y-4">
            <CodeBlock code={brewConfig.commands} title={t('download.homebrewCommands')} />
            {brewConfig.notes && <NotesSection notes={brewConfig.notes} />}
          </div>
        ))}
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('download.binaryDownloads')}</h3>

        {macosVariants.map((variant, index) => (
          <BinaryDownloadCard key={index} variant={variant} />
        ))}
      </div>

      {/* Platform Notes */}
      <NotesSection notes={platformNotes} />
    </div>
  );
}
