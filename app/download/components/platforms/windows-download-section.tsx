'use client'

import { formatVersion, type GitHubRelease } from '@/lib/github';
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  launcherRelease: GitHubRelease | null;
  className?: string;
}

export default function WindowsDownloadSection({ platform, launcherRelease, className }: WindowsDownloadSectionProps) {
  const releaseUrl = launcherRelease?.html_url || 'https://github.com/rustfs/launcher/releases/latest';
  const version = launcherRelease ? formatVersion(launcherRelease.tag_name) : 'latest';
  const versionTag = launcherRelease?.tag_name || 'latest';
  const versionWithoutV = versionTag.startsWith('v') ? versionTag.slice(1) : versionTag;
  const versionWithV = versionTag.startsWith('v') ? versionTag : `v${versionTag}`;
  const installerFilename = `rustfs-launcher-windows-x86_64-v${versionWithoutV}-setup.exe`;
  const directDownloadUrl = launcherRelease
    ? `https://dl.rustfs.com/artifacts/rustfs-launcher/release/rustfs-launcher-windows-x86_64-${versionWithV}-setup.exe`
    : 'https://dl.rustfs.com/artifacts/rustfs-launcher/release/rustfs-launcher-windows-x86_64-latest-setup.exe';

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Installer Download */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Download from GitHub'}</h3>

        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{'Latest Version'}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {launcherRelease ? `Current latest version: ${version}` : 'Fetching latest version information...'}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{'Download Steps:'}</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      {'Visit '}
                      <a
                        href={releaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-primary hover:underline"
                      >
                        <span>{'GitHub Release page'}</span>
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      {'Find and download '}
                      <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono text-foreground">
                        {installerFilename}
                      </code>
                      {' from the Assets section'}
                    </li>
                    <li>{'After downloading, double-click the installer to complete the installation'}</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <a
                    href={releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <span>{'Go to Release Page'}</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{'Tip: '}</strong>
              {'The Launcher installer includes the RustFS binary. After installation, you can use it immediately.'}
            </p>
          </div>
        </div>
      </div>

      {/* Direct Download */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Download from Download Site'}</h3>

        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{'Latest Version'}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {launcherRelease ? `Current latest version: ${version}` : 'Fetching latest version information...'}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{'Download Steps:'}</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>{'Click the download button or link below to download the installer'}</li>
                    <li>{'After downloading, double-click the installer to complete the installation'}</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <a
                    href={directDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>{'Download Windows x86_64 Installer'}</span>
                  </a>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    {'Download link: '}
                    <a
                      href={directDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-primary hover:underline break-all"
                    >
                      {directDownloadUrl}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{'Tip: '}</strong>
              {'The Launcher installer includes the RustFS binary. After installation, you can use it immediately.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
