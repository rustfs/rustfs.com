'use client'

import { formatReleaseDate, formatVersion, getLatestRelease, type GitHubRelease } from '@/lib/github';
import { useTranslations } from '@/lib/i18n';
import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { BookOpenIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from 'react';
import PlatformSelector from './platform-selector';
import PlatformFactory from './platforms/platform-factory';
import { type PlatformInfoData } from './platforms/platform-info';

export default function DownloadPageClient() {
  const { t, locale } = useTranslations('download'); // 使用 download 命名空间

  // 平台配置 - 直接使用 useMemo，不依赖 t 函数
  const platforms = useMemo((): PlatformInfoData[] => [
    {
      id: "linux",
      name: t('Linux'),
      icon: <LinuxIcon className="w-full h-full aspect-square" />,
      description: {
        zh: t('Ubuntu 18.04+, CentOS 7+, and other Linux distributions'),
        en: t('Ubuntu 18.04+, CentOS 7+, and other Linux distributions'),
      },
      available: true,
    },
    {
      id: "docker",
      name: t('Docker'),
      icon: <DockerIcon className="w-full h-full aspect-square" />,
      description: {
        zh: t('Docker 20.10+ with containerized deployment'),
        en: t('Docker 20.10+ with containerized deployment'),
      },
      available: true,
    },
    {
      id: "macos",
      name: t('macOS'),
      icon: <AppleIcon className="w-full h-full aspect-square" />,
      description: {
        zh: t('macOS 10.15+ with native binary support'),
        en: t('macOS 10.15+ with native binary support'),
      },
      available: true,
    },
    {
      id: "windows",
      name: t('Windows'),
      icon: <WindowsIcon className="w-full h-full aspect-square" />,
      description: {
        zh: t('Windows 10/11 with native binary support'),
        en: t('Windows 10/11 with native binary support'),
      },
      available: false,
      comingSoon: true,
    },
  ], [t]);

  const availablePlatforms = useMemo(() => platforms.filter((p: PlatformInfoData) => p.available), [platforms]);

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformInfoData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [isLoadingRelease, setIsLoadingRelease] = useState(true);

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

  // Get latest version information
  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const latestRelease = await getLatestRelease();
        setRelease(latestRelease);
      } catch (error) {
        console.error('Failed to fetch latest release:', error);
      } finally {
        setIsLoadingRelease(false);
      }
    };

    fetchLatestRelease();
  }, []);

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              {t('Download RustFS')}
            </h1>
          </div>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {t('Choose the RustFS version that suits your system')}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={release ? release.html_url : "https://github.com/rustfs/rustfs/releases"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 px-6 py-3 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-200"
              title={t('View GitHub Release Page')}
            >
              {/* 版本信息 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">
                  {isLoadingRelease ? (
                    t('Loading latest version...')
                  ) : release ? (
                    formatVersion(release.tag_name)
                  ) : (
                    'v1.0.0'
                  )}
                </span>
                {!isLoadingRelease && (
                  <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>{t('Latest')}</span>
                  </span>
                )}
              </div>

              {release && (
                <span className="text-xs text-muted-foreground">
                  {`${t('Released on')} ${formatReleaseDate(release.published_at, locale === 'zh' ? 'zh-CN' : 'en-US')}`}
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
            <PlatformFactory platform={selectedPlatform} />
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {t('Need Help?')}
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
                {t('Documentation')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('Detailed installation guides and usage instructions')}
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
                {t('Community Support')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('Join community discussions and get technical support')}
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
