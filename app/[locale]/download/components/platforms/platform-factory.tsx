'use client'

import { useTranslations } from "@/lib/i18n";
import DockerDownloadSection from "./docker-download-section";
import LinuxDownloadSection from "./linux-download-section";
import MacOSDownloadSection from "./macos-download-section";
import { type PlatformInfoData } from "./platform-info";
import WindowsDownloadSection from "./windows-download-section";

interface PlatformFactoryProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function PlatformFactory({ platform, className }: PlatformFactoryProps) {
  const { t } = useTranslations('download');

  switch (platform.id) {
    case 'linux':
      return <LinuxDownloadSection platform={platform} className={className} />;
    case 'docker':
      return <DockerDownloadSection platform={platform} className={className} />;
    case 'macos':
      return <MacOSDownloadSection platform={platform} className={className} />;
    case 'windows':
      return <WindowsDownloadSection platform={platform} className={className} />;
    default:
      // Fallback for unknown platforms
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
            <div className="opacity-50">{platform.icon}</div>
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">{platform.name}</h2>
          <p className="text-muted-foreground">{t('Platform not supported')}</p>
        </div>
      );
  }
}
