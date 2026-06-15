'use client'

import { formatReleaseDate, formatVersion, type GitHubRelease } from '@/lib/github';
import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { BookOpenIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from 'react';
import InstallationTopology from './installation-topology';
import PlatformSelector from './platform-selector';
import PlatformFactory from './platforms/platform-factory';
import { type PlatformInfoData } from './platforms/platform-info';
import RcDownloadSection from './rc-download-section';

interface DownloadPageClientProps {
  release: GitHubRelease | null;
  cliRelease: GitHubRelease | null;
}

export default function DownloadPageClient({ release, cliRelease }: DownloadPageClientProps) {// 使用 download 命名空间

  // 平台配置 - 直接使用 useMemo，不依赖 t 函数
  const platforms = useMemo((): PlatformInfoData[] => [
    {
      id: "linux",
      name: 'Linux',
      icon: <LinuxIcon className="w-full h-full aspect-square" />,
      description: 'Ubuntu 18.04+, CentOS 7+, and other Linux distributions',
      available: true,
    },
    {
      id: "docker",
      name: 'Docker',
      icon: <DockerIcon className="w-full h-full aspect-square" />,
      description: 'Docker 20.10+ with containerized deployment',
      available: true,
    },
    {
      id: "macos",
      name: 'macOS',
      icon: <AppleIcon className="w-full h-full aspect-square" />,
      description: 'macOS 10.15+ with native binary support',
      available: true,
    },
    {
      id: "windows",
      name: 'Windows',
      icon: <WindowsIcon className="w-full h-full aspect-square" />,
      description: 'Windows 10/11 with native binary support',
      available: true,
    },
  ], []);

  const availablePlatforms = useMemo(() => platforms.filter((p: PlatformInfoData) => p.available), [platforms]);

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformInfoData | null>(
    availablePlatforms[0] ?? null
  );

  // Initialize from URL after hydration so server and client markup stay stable.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const platformParam = new URLSearchParams(window.location.search).get('platform');
    const platform = platformParam
      ? platforms.find((item: PlatformInfoData) => item.id === platformParam && item.available)
      : null;

    if (!platform || platform.id === selectedPlatform?.id) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setSelectedPlatform(platform);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [platforms, selectedPlatform?.id]);

  // Handle platform selection change
  const handlePlatformChange = (platform: PlatformInfoData) => {
    setSelectedPlatform(platform);

    // Update URL (client-side only)
    if (typeof window !== 'undefined') {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('platform', platform.id);
      window.history.replaceState({}, '', newUrl.toString());
    }
  };



  return (
    <main className="min-h-screen z-10">
      {/* Hero Section */}
      <section className="py-20 bg-linear-to-b from-background/30 to-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              {'Download RustFS'}
            </h1>
          </div>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {'Find the best installation method for RustFS Server and the native rc CLI across Linux, macOS, Windows, Docker, and Kubernetes.'}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={release ? release.html_url : "https://github.com/rustfs/rustfs/releases"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 px-6 py-3 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-200"
              title={'View GitHub Release Page'}
            >
              {/* 版本信息 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">
                  {release ? formatVersion(release.tag_name) : 'v1.0.0'}
                </span>
                {release && (
                  <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                    <div className="w-1 h-1 bg-success rounded-full"></div>
                    <span>{'Latest'}</span>
                  </span>
                )}
              </div>

              {release && (
                <span className="text-xs text-muted-foreground">
                  {`Released on ${formatReleaseDate(release.published_at, 'en-US')}`}
                </span>
              )}

              {/* 外链图标 */}
              <svg className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Platform Selection */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PlatformSelector
            platforms={platforms}
            selectedPlatform={selectedPlatform}
            onPlatformChange={handlePlatformChange}
          />
        </div>
      </section>

      {/* Download Section */}
      {selectedPlatform && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PlatformFactory platform={selectedPlatform} release={release} />
          </div>
        </section>
      )}

      <RcDownloadSection release={cliRelease} />
      <InstallationTopology />

      {/* Help Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {'Need Help?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <a
              href="https://docs.rustfs.com"
              className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpenIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {'Documentation'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {'Detailed installation guides and usage instructions'}
              </p>
            </a>

            <a
              href="https://github.com/rustfs/rustfs/issues"
              className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {'GitHub Issue'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {'Report bugs, request help, and track technical issues'}
              </p>
            </a>

            <a
              href="https://discord.gg/NcKBCEJp6P"
              className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {'Discord'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {'Join the RustFS community for discussion and support'}
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
