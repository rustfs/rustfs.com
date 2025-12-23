'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";
import { getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github';

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function WindowsDownloadSection({ platform, release, className }: WindowsDownloadSectionProps) {
  // Get download URL from release assets or use fallback
  const downloadUrl = release
    ? getDownloadUrlForPlatform(release, 'windows', 'x86_64')
    : null;

  const fallbackUrl = release?.html_url || 'https://github.com/rustfs/rustfs/releases/latest';
  const finalDownloadUrl = downloadUrl || fallbackUrl;

  // Extract filename from URL for code block
  const getFilenameFromUrl = (url: string) => {
    if (url.includes('github.com')) {
      return 'rustfs.exe';
    }
    const match = url.match(/([^\/]+\.exe)/);
    return match ? match[1] : 'rustfs.exe';
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Binary Downloads'}</h3>

        {/* x86_64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">x86_64</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: x86_64
              </p>
            </div>
            <a
              href={finalDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "# Download RustFS for Windows",
              "# Option 1: Download from GitHub Releases",
              `# Visit: ${fallbackUrl}`,
              "",
              "# Option 2: Using PowerShell",
              downloadUrl
                ? `Invoke-WebRequest -Uri "${downloadUrl}" -OutFile "${getFilenameFromUrl(downloadUrl)}"`
                : "# Download from GitHub Releases page",
              "",
              "# Run RustFS",
              ".\\rustfs.exe --version",
            ]}
            title={'Installation Commands'}
          />

          <div className="space-y-2">
            <Note type="tip">
              {'Default credentials: rustfsadmin / rustfsadmin'}
            </Note>
            <Note type="info">
              {'Windows 10/11 x64 compatible'}
            </Note>
          </div>
        </div>
      </div>
    </div>
  );
}
