'use client'

import { getAvailablePlatforms, getPlatformById, PlatformInfo } from "@/data/platforms";
import { formatReleaseDate, formatVersion, getLatestRelease, GitHubRelease } from "@/lib/github";
import { useI18n } from "@/lib/i18n";
import { BookOpenIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DownloadSection from "./components/download-section";
import PlatformSelector from "./components/platform-selector";

export default function DownloadPage() {
  const { tw, language } = useI18n();
  const availablePlatforms = getAvailablePlatforms();

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformInfo | null>(null);
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [isLoadingRelease, setIsLoadingRelease] = useState(true);

  // Initialize selected platform
  useEffect(() => {
    // Get platform parameter from URL (client-side only)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const platformParam = urlParams.get('platform');

      if (platformParam) {
        const platform = getPlatformById(platformParam);
        if (platform && platform.available) {
          setSelectedPlatform(platform);
          return;
        }
      }
    }

    // If no valid platform parameter, use first available platform
    if (availablePlatforms.length > 0) {
      setSelectedPlatform(availablePlatforms[0]);
    }
  }, [availablePlatforms]);

  // Handle platform selection change
  const handlePlatformChange = (platform: PlatformInfo) => {
    setSelectedPlatform(platform);

    // Update URL (client-side only)
    if (typeof window !== 'undefined') {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('platform', platform.id);
      window.history.replaceState({}, '', newUrl.toString());
    }
  };

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

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              {tw('下载 RustFS', 'Download RustFS')}
            </h1>
          </div>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {tw(
              '选择适合您系统的 RustFS 版本，支持 Windows、Linux、macOS 和 Docker 部署。开始体验高性能的分布式存储系统。',
              'Choose the RustFS version that suits your system, supporting Windows, Linux, macOS and Docker deployment. Start experiencing high-performance distributed storage systems.'
            )}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={release ? release.html_url : "https://github.com/rustfs/rustfs/releases"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 px-6 py-3 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-200"
              title={tw('查看GitHub发布页面', 'View GitHub Release Page')}
            >
              {/* 版本信息 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">
                  {isLoadingRelease ? (
                    tw('正在获取最新版本...', 'Loading latest version...')
                  ) : release ? (
                    formatVersion(release.tag_name)
                  ) : (
                    'v1.0.0'
                  )}
                </span>
                {!isLoadingRelease && (
                  <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>{tw('最新', 'Latest')}</span>
                  </span>
                )}
              </div>

              {release && (
                <span className="text-xs text-muted-foreground">
                  {tw(`发布于 ${formatReleaseDate(release.published_at, language)}`, `Released on ${formatReleaseDate(release.published_at, language)}`)}
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
            selectedPlatform={selectedPlatform}
            onPlatformChange={handlePlatformChange}
          />
        </div>
      </section>

      {/* Download Section */}
      {selectedPlatform && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DownloadSection platform={selectedPlatform} />
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {tw('需要帮助？', 'Need Help?')}
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
                {tw('查看文档', 'Documentation')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tw('详细的安装指南和使用说明', 'Detailed installation guides and usage instructions')}
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
                {tw('社区支持', 'Community Support')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tw('加入社区讨论，获取技术支持', 'Join community discussions and get technical support')}
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
