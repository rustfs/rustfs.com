"use client";

import { type PlatformInfo } from "@/data/platforms";
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import CodeBlock from "./code-block";
import NotesSection from "./notes-section";

interface DownloadSectionProps {
  platform: PlatformInfo;
  className?: string;
}

export default function DownloadSection({ platform, className }: DownloadSectionProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (!platform.available) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
          <div className="opacity-50">{platform.icon}</div>
        </div>
        <h2 className="text-2xl font-bold text-muted-foreground mb-2">{platform.name}</h2>
        <p className="text-muted-foreground mb-4">{t('download.comingSoon')}</p>
        <div className="max-w-md mx-auto p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
          <p className="text-sm text-muted-foreground">
            {t('download.preparingPlatform')}
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
          <p className="text-muted-foreground">{platform.description[locale as 'zh' | 'en']}</p>
        </div>
      </div>

      {/* Docker Installation */}
      {platform.id === "docker" && platform.variants && (
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

          {platform.variants.map((variant, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{variant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('download.version')}: {variant.architecture}
                  </p>
                </div>
                <a
                  href={variant.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <ExternalLinkIcon className="w-4 h-4" />
                  <span>{t('download.view')}</span>
                </a>
              </div>

              <CodeBlock code={variant.commands} title={t('download.dockerCommands')} />

              {/* Variant Notes */}
              <NotesSection notes={variant.notes || []} />
            </div>
          ))}
        </div>
      )}

      {/* Binary Downloads */}
      {platform.variants && platform.variants.length > 0 && platform.id !== "docker" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">{t('download.binaryDownloads')}</h3>

          {platform.variants.map((variant, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{variant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('download.architecture')}: {variant.architecture}
                  </p>
                </div>
                <a
                  href={variant.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <DownloadIcon className="w-4 h-4" />
                  <span>{t('download.download')}</span>
                </a>
              </div>

              <CodeBlock code={variant.commands} title={t('download.installationCommands')} />

              {/* Variant Notes */}
              <NotesSection notes={variant.notes || []} />
            </div>
          ))}
        </div>
      )}

      {/* Platform Notes */}
      {platform.notes && platform.notes.length > 0 && (
        <NotesSection notes={platform.notes} />
      )}
    </div>
  );
}
