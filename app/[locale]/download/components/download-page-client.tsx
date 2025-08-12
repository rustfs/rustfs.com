'use client'

import { useTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import PlatformSelector from './platform-selector';
import { usePlatformConfig } from './platforms/platform-config';
import PlatformFactory from './platforms/platform-factory';
import { type PlatformInfoData } from './platforms/platform-info';

export default function DownloadPageClient() {
  const { t } = useTranslations('download'); // 使用 download 命名空间
  const platforms = usePlatformConfig();
  const availablePlatforms = platforms.filter(p => p.available);

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformInfoData | null>(null);

  // Initialize selected platform
  useEffect(() => {
    // Get platform parameter from URL (client-side only)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const platformParam = urlParams.get('platform');

      if (platformParam) {
        const platform = platforms.find(p => p.id === platformParam);
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
  }, [platforms, availablePlatforms]);

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
