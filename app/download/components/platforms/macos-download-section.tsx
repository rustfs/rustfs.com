'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";
import { getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github';

interface MacOSDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function MacOSDownloadSection({ platform, release, className }: MacOSDownloadSectionProps) {
  // Get download URLs from release assets or use fallback
  const aarch64Url = release
    ? getDownloadUrlForPlatform(release, 'macos', 'aarch64')
    : null;

  const x86_64Url = release
    ? getDownloadUrlForPlatform(release, 'macos', 'x86_64')
    : null;

  const fallbackAarch64Url = 'https://github.com/rustfs/rustfs/releases/latest';
  const fallbackX86_64Url = 'https://github.com/rustfs/rustfs/releases/latest';

  const finalAarch64Url = aarch64Url || fallbackAarch64Url;
  const finalX86_64Url = x86_64Url || fallbackX86_64Url;

  // Extract filename from URL for code block
  const getFilenameFromUrl = (url: string, arch: string) => {
    if (url.includes('github.com')) {
      return `rustfs-macos-${arch}-latest.zip`;
    }
    const match = url.match(/([^\/]+\.zip)/);
    return match ? match[1] : `rustfs-macos-${arch}-latest.zip`;
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Homebrew Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{'Homebrew Installation'}</h3>

        <CodeBlock
          code={["brew tap rustfs/homebrew-tap", "brew install rustfs", "rustfs --version"]}
          title={'Homebrew Commands'}
        />

        <Note type="info">
          <Link href="https://brew.sh/" target="_blank" className="hover:underline">
            {'Homebrew is required for installation'}
          </Link>
        </Note>
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Binary Downloads'}</h3>

        {/* Apple Silicon Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'Apple Silicon'}</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: aarch64
              </p>
            </div>
            <a
              href={finalAarch64Url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              `curl --progress-bar -L -O ${finalAarch64Url}`,
              `unzip ${getFilenameFromUrl(finalAarch64Url, 'aarch64')}`,
              "chmod +x rustfs",
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <div className="space-y-2">
            <Note type="tip">
              {'Default credentials: rustfsadmin / rustfsadmin'}
            </Note>
            <Note type="tip">
              {'Apple Silicon optimized for better performance'}
            </Note>
          </div>
        </div>

        {/* Intel Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'Intel'}</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: x86_64
              </p>
            </div>
            <a
              href={finalX86_64Url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              `curl --progress-bar -L -O ${finalX86_64Url}`,
              `unzip ${getFilenameFromUrl(finalX86_64Url, 'x86_64')}`,
              "chmod +x rustfs",
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <Note type="tip">
            {'Default credentials: rustfsadmin / rustfsadmin'}
          </Note>
        </div>
      </div>
    </div>
  );
}
