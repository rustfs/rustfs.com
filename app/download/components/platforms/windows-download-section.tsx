'use client'

import { getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github';
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function WindowsDownloadSection({ platform, release, className }: WindowsDownloadSectionProps) {
  const releaseUrl = release?.html_url || 'https://github.com/rustfs/rustfs/releases/latest';
  const downloadUrl = release ? getDownloadUrlForPlatform(release, 'windows', 'x86_64') : null;
  const finalDownloadUrl = downloadUrl || releaseUrl;
  const filename = downloadUrl?.match(/([^/]+\.zip)$/)?.[1] || 'rustfs-windows-x86_64-latest.zip';

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Binary Download */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Binary Download'}</h3>

        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{'Windows x86_64'}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {'Download the Windows package, unzip it, and run the RustFS binary.'}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{'Download Steps:'}</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      {'Download from '}
                      <a
                        href={finalDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-primary hover:underline"
                      >
                        <span>{downloadUrl ? filename : 'GitHub Release page'}</span>
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    </li>
                    <li>{'Unzip the package'}</li>
                    <li>{'Run the executable from the extracted directory'}</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <a
                    href={finalDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>{'Download Windows x86_64'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={[
              `curl -L -O ${finalDownloadUrl}`,
              `unzip ${filename}`,
              "rustfs.exe --version",
            ]}
            title={'Installation Commands'}
          />

          <Note type="info">
            {'For all versions and architectures, visit the RustFS GitHub Release page.'}
          </Note>
        </div>
      </div>
    </div>
  );
}
