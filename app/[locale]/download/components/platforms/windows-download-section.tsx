'use client'

import { type PlatformInfoData } from "./platform-info";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function WindowsDownloadSection({ platform, className }: WindowsDownloadSectionProps) {
  const t = useTranslations();

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
