'use client'

import DockerDownloadSection from "./docker-download-section";
import LinuxDownloadSection from "./linux-download-section";
import MacOSDownloadSection from "./macos-download-section";
import { type PlatformInfoData } from "./platform-info";
import WindowsDownloadSection from "./windows-download-section";
import { type GitHubRelease } from '@/lib/github';

interface PlatformFactoryProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function PlatformFactory({ platform, release, className }: PlatformFactoryProps) {switch (platform.id) {
    case 'linux':
      return <LinuxDownloadSection platform={platform} release={release} className={className} />;
    case 'docker':
      return <DockerDownloadSection platform={platform} release={release} className={className} />;
    case 'macos':
      return <MacOSDownloadSection platform={platform} release={release} className={className} />;
    case 'windows':
      return <WindowsDownloadSection platform={platform} release={release} className={className} />;
    default:
      // Fallback for unknown platforms
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
            <div className="opacity-50">{platform.icon}</div>
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">{platform.name}</h2>
          <p className="text-muted-foreground">{'Platform not supported'}</p>
        </div>
      );
  }
}
