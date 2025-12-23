'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";
import { getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github';

interface LinuxDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function LinuxDownloadSection({ platform, release, className }: LinuxDownloadSectionProps) {
  // Get download URLs from release assets or use fallback
  const x86_64Url = release
    ? getDownloadUrlForPlatform(release, 'linux', 'x86_64')
    : null;

  const aarch64Url = release
    ? getDownloadUrlForPlatform(release, 'linux', 'aarch64')
    : null;

  const fallbackX86_64Url = 'https://github.com/rustfs/rustfs/releases/latest';
  const fallbackAarch64Url = 'https://github.com/rustfs/rustfs/releases/latest';

  const finalX86_64Url = x86_64Url || fallbackX86_64Url;
  const finalAarch64Url = aarch64Url || fallbackAarch64Url;

  // Extract filename from URL for code block
  const getFilenameFromUrl = (url: string, arch: string) => {
    if (url.includes('github.com')) {
      return `rustfs-linux-${arch}-musl.zip`;
    }
    const match = url.match(/([^\/]+\.zip)/);
    return match ? match[1] : `rustfs-linux-${arch}-musl.zip`;
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* One-click Installation Script */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{'One-click Installation Script'}</h3>
        <CodeBlock
          code={["curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh"]}
          title={'One-click Installation Script'}
        />
      </div>

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
              `curl -O ${finalX86_64Url}`,
              `unzip ${getFilenameFromUrl(finalX86_64Url, 'x86_64')}`,
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <Note type="tip">
            {'Default credentials: rustfsadmin / rustfsadmin'}
          </Note>
        </div>

        {/* aarch64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">aarch64</h4>
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
              `curl -O ${finalAarch64Url}`,
              `unzip ${getFilenameFromUrl(finalAarch64Url, 'aarch64')}`,
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <div className="space-y-2">
            <Note type="info">
              {'ARM64 optimized for better performance'}
            </Note>
            <Note type="tip">
              {'Default credentials: rustfsadmin / rustfsadmin'}
            </Note>
          </div>
        </div>
      </div>
    </div>
  );
}
