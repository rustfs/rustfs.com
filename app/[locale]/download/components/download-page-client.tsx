'use client'

import { useTranslations } from '@/lib/i18n';
import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { useEffect, useMemo, useState } from 'react';
import PlatformSelector from './platform-selector';
import PlatformFactory from './platforms/platform-factory';
import { type PlatformInfoData } from './platforms/platform-info';

export async function generateMetadata() {
  return {
    title: 'RustFS 下载安装',
    description: 'RustFS 是 MinIO 的国产平替, 可在 Linux, docker, macOS, Windows 以及云原生环境下一键式安装部署 RustFS.',
    keywords: ['Linux', 'Windows', 'docker', 'macOS'],
  }
}

export default function DownloadPageClient() {
  const { t } = useTranslations('download'); // 使用 download 命名空间

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
            {t('Choose your platform')}
          </p>
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
    </main>
  );
}
