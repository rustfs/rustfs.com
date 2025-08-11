'use client'

import { type PlatformInfoData } from "./platform-info";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import DockerDeploymentCard from "../common/docker-deployment-card";
import PlatformHeader from "../common/platform-header";
import NotesSection from "../notes-section";

interface DockerDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function DockerDownloadSection({ platform, className }: DockerDownloadSectionProps) {
  const t = useTranslations();

  // Docker 平台自己管理自己的数据
  const dockerVariants = [
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
          type: "warning" as const,
          content: {
            zh: "开发测试版本，包含最新功能但可能不稳定",
            en: "Development version with latest features but may be unstable",
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
          type: "warning" as const,
          content: {
            zh: "每日构建版本，极不稳定，仅供尝鲜使用",
            en: "Daily builds, highly unstable, for early testing only",
          },
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
        zh: "查看所有可用版本",
        en: "View all available versions",
      },
      url: "https://hub.docker.com/r/rustfs/rustfs/tags",
    },
    {
      type: "success" as const,
      content: {
        zh: "Docker 快速开始指南",
        en: "Docker quick start guide",
      },
      url: "https://docs.rustfs.com/installation/docker",
    },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Docker Deployment */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">{t('download.dockerDeployment')}</h3>
          <a
            href="https://hub.docker.com/r/rustfs/rustfs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80">
            <span>{t('download.viewImage')}</span>
            <ExternalLinkIcon className="w-3 h-3" />
          </a>
        </div>

        {dockerVariants.map((variant, index) => (
          <DockerDeploymentCard key={index} variant={variant} />
        ))}
      </div>

      {/* Platform Notes */}
      <NotesSection notes={platformNotes} />
    </div>
  );
}
