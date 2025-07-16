"use client";

import { type PlatformInfo } from "@/data/platforms";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import CodeBlock from "./code-block";
import NotesSection from "./notes-section";

interface DownloadSectionProps {
  platform: PlatformInfo;
  className?: string;
}

export default function DownloadSection({ platform, className }: DownloadSectionProps) {
  const { tw } = useI18n();

  if (!platform.available) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
          <div className="opacity-50">{platform.icon}</div>
        </div>
        <h2 className="text-2xl font-bold text-muted-foreground mb-2">{platform.name}</h2>
        <p className="text-muted-foreground mb-4">{tw("即将开放下载", "Coming Soon")}</p>
        <div className="max-w-md mx-auto p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
          <p className="text-sm text-muted-foreground">
            {tw("我们正在为此平台准备 RustFS，敬请期待！", "We are preparing RustFS for this platform, stay tuned!")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground">
          {platform.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{platform.name}</h2>
          <p className="text-muted-foreground">{tw(platform.description.zh, platform.description.en)}</p>
        </div>
      </div>

      {/* Docker Installation */}
      {platform.id === "docker" && platform.variants && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-foreground">{tw("Docker 部署", "Docker Deployment")}</h3>
            <a
              href="https://hub.docker.com/r/rustfs/rustfs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80">
              <span>{tw("查看镜像", "View Image")}</span>
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>

          {platform.variants.map((variant, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{variant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tw("版本", "Version")}: {variant.architecture}
                  </p>
                </div>
                <a
                  href={variant.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <ExternalLinkIcon className="w-4 h-4" />
                  <span>{tw("查看", "View")}</span>
                </a>
              </div>

              <CodeBlock code={variant.commands} title={tw("Docker 命令", "Docker Commands")} />

              {/* Variant Notes */}
              <NotesSection notes={variant.notes || []} />
            </div>
          ))}
        </div>
      )}

      {/* Binary Downloads */}
      {platform.variants && platform.variants.length > 0 && platform.id !== "docker" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">{tw("二进制下载", "Binary Downloads")}</h3>

          {platform.variants.map((variant, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{variant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tw("架构", "Architecture")}: {variant.architecture}
                  </p>
                </div>
                <a
                  href={variant.downloadUrl}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <DownloadIcon className="w-4 h-4" />
                  <span>{tw("下载", "Download")}</span>
                </a>
              </div>

              <CodeBlock code={variant.commands} title={tw("安装命令", "Installation Commands")} />

              {/* Variant Notes */}
              <NotesSection notes={variant.notes || []} />
            </div>
          ))}
        </div>
      )}

      {/* One-click Installation */}
      {platform.installScript && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{tw("一键安装", "One-click Installation")}</h3>

          <CodeBlock code={[platform.installScript]} title={tw("Shell 脚本", "Shell Script")} />
        </div>
      )}

      {/* brew Installation */}
      {platform.brewConfig && platform.brewConfig.length > 0 && platform.id == "macos" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">
            {tw("Homebrew安装（建议）", "Via Homebrew (Recommended)")}
          </h3>

          {platform.brewConfig.map((variant, index) => (
            <div key={index} className="space-y-4">
              {/*  Notes */}
              <NotesSection notes={variant.notes || []} />
              <CodeBlock code={variant.commands} title={tw("安装命令", "Installation Commands")} />
            </div>
          ))}
        </div>
      )}

      {/* Platform Notes */}
      <NotesSection notes={platform.notes || []} />
    </div>
  );
}
