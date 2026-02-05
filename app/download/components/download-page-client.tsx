'use client'

import { formatReleaseDate, formatVersion, type GitHubRelease } from '@/lib/github';
import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { BookOpenIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from 'react';
import PlatformSelector from './platform-selector';
import PlatformFactory from './platforms/platform-factory';
import { type PlatformInfoData } from './platforms/platform-info';

interface DownloadPageClientProps {
  release: GitHubRelease | null;
  launcherRelease: GitHubRelease | null;
}

export default function DownloadPageClient({ release, launcherRelease }: DownloadPageClientProps) {// 使用 download 命名空间

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
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformInfoData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize selected platform - 只在组件挂载时执行一次
  useEffect(() => {
    // 确保只初始化一次
    if (isInitialized) {
      return;
    }

    // 确保 platforms 和 availablePlatforms 已经准备好
    if (!platforms.length || !availablePlatforms.length) {
      return;
    }

    // Get platform parameter from URL (client-side only)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const platformParam = urlParams.get('platform');

      if (platformParam) {
        const platform = platforms.find((p: PlatformInfoData) => p.id === platformParam);
        if (platform && platform.available) {
          setSelectedPlatform(platform);
          setIsInitialized(true);
          return;
        }
      }
    }

    // If no valid platform parameter, use first available platform
    if (availablePlatforms.length > 0) {
      setSelectedPlatform(availablePlatforms[0]);
      setIsInitialized(true);
    }
  }, [platforms, availablePlatforms, isInitialized]);

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
            {'Choose the RustFS version that suits your system, supporting Windows, Linux, macOS and Docker deployment. Start experiencing high-performance distributed storage systems.'}
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
            <PlatformFactory platform={selectedPlatform} release={release} launcherRelease={launcherRelease} />
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {'Need Help?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              href="https://github.com/rustfs/rustfs/discussions"
              className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {'Community Support'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {'Join community discussions and get technical support'}
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
