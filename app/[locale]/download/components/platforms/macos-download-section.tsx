'use client'

import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface MacOSDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function MacOSDownloadSection({ platform, className }: MacOSDownloadSectionProps) {
  const { t } = useTranslations('download');

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Homebrew Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{t('Homebrew Installation')}</h3>

        <CodeBlock
          code={["brew tap rustfs/homebrew-tap", "brew install rustfs", "rustfs --version"]}
          title={t('Homebrew Commands')}
        />

        <Note type="info">
          <Link href="https://brew.sh/" target="_blank" className="hover:underline">
            {t('Homebrew is required for installation')}
          </Link>
        </Note>
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('Binary Downloads')}</h3>

        {/* Apple Silicon Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{t('Apple Silicon')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: aarch64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-aarch64-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <span>⬇️</span>
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl --progress-bar -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-aarch64-latest.zip",
              "unzip rustfs-darwin-aarch64-latest.zip",
              "chmod +x rustfs",
              "./rustfs --version",
            ]}
            title={t('Installation Commands')}
          />

          <div className="space-y-2">
            <Note type="tip">
              {t('Default credentials: admin / admin123')}
            </Note>
            <Note type="tip">
              {t('Apple Silicon optimized for better performance')}
            </Note>
          </div>
        </div>

        {/* Intel Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{t('Intel')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: x86_64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-x86_64-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <span>⬇️</span>
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl --progress-bar -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-x86_64-latest.zip",
              "unzip rustfs-darwin-x86_64-latest.zip",
              "chmod +x rustfs",
              "./rustfs --version",
            ]}
            title={t('Installation Commands')}
          />

          <Note type="tip">
            {t('Default credentials: admin / admin123')}
          </Note>
        </div>
      </div>

      {/* Platform Notes */}
      <div className="space-y-2">
        <Note type="tip">
          {t('Default credentials: admin / admin123')}
        </Note>
        <Note type="info">
          <Link href="https://docs.rustfs.com/installation/macos" target="_blank" className="hover:underline">
            {t('View detailed macOS installation guide')}
          </Link>
        </Note>
      </div>
    </div>
  );
}
