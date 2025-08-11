'use client'

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CodeBlock from "../code-block";
import BinaryDownloadCard from "../common/binary-download-card";
import PlatformHeader from "../common/platform-header";
import NotesSection from "../notes-section";
import { type PlatformInfoData } from "./platform-info";

interface LinuxDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function LinuxDownloadSection({ platform, className }: LinuxDownloadSectionProps) {
  const t = useTranslations();

  // Linux 平台自己管理自己的数据
  const linuxVariants = [
    {
      name: "x86_64",
      architecture: "x86_64",
      downloadUrl: "https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip",
      commands: [
        "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip",
        "unzip rustfs-linux-x86_64-musl-latest.zip",
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
    {
      name: "aarch64",
      architecture: "aarch64",
      downloadUrl: "https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip",
      commands: [
        "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip",
        "unzip rustfs-linux-aarch64-musl-latest.zip",
        "./rustfs --version",
      ],
      notes: [
        {
          type: "info" as const,
          content: {
            zh: "适用于 ARM64 架构（树莓派、云服务器等），功耗更低",
            en: "For ARM64 architecture (Raspberry Pi, cloud servers, etc.) with lower power consumption",
          },
        },
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

  const installScript = "curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh";

  const platformNotes = [
    {
      type: "info" as const,
      content: {
        zh: "查看详细安装文档",
        en: "View detailed installation guide",
      },
      url: "https://docs.rustfs.com/installation/linux",
    },
    {
      type: "tip" as const,
      content: {
        zh: "RustFS 的初始化默认用户名和密码均为 rustfsadmin。建议安装完毕后对用户名和密码进行修改。",
        en: "The default username and password for RustFS are rustfsadmin. It is recommended to modify the username and password after installation.",
      },
    },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* One-click Installation Script */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{t('download.oneClickInstall')}</h3>
        <CodeBlock
          code={[installScript]}
          title={t('download.oneClickInstallScript')}
        />
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('download.binaryDownloads')}</h3>

        {linuxVariants.map((variant, index) => (
          <BinaryDownloadCard key={index} variant={variant} />
        ))}
      </div>

      {/* Platform Notes */}
      <NotesSection notes={platformNotes} />
    </div>
  );
}
