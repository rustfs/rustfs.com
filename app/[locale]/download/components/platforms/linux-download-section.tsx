'use client'

import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface LinuxDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function LinuxDownloadSection({ platform, className }: LinuxDownloadSectionProps) {
  const { t } = useTranslations('download');

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* One-click Installation Script */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{t('One-click Installation Script')}</h3>
        <CodeBlock
          code={["curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh"]}
          title={t('One-click Installation Script')}
        />
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('Binary Downloads')}</h3>

        {/* x86_64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">x86_64</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: x86_64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <span>⬇️</span>
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip",
              "unzip rustfs-linux-x86_64-musl-latest.zip",
              "./rustfs --version",
            ]}
            title={t('Installation Commands')}
          />

          <Note type="tip">
            {t('Default credentials: admin / admin123')}
          </Note>
        </div>

        {/* aarch64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">aarch64</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: aarch64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <span>⬇️</span>
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip",
              "unzip rustfs-linux-aarch64-musl-latest.zip",
              "./rustfs --version",
            ]}
            title={t('Installation Commands')}
          />

          <div className="space-y-2">
            <Note type="info">
              {t('ARM64 optimized for better performance')}
            </Note>
            <Note type="tip">
              {t('Default credentials: admin / admin123')}
            </Note>
          </div>
        </div>
      </div>

      {/* Platform Notes */}
      <div className="space-y-2">
        <Note type="info">
          <Link href="https://docs.rustfs.com/installation/linux" target="_blank" className="hover:underline">
            View detailed Linux installation guide
          </Link>
        </Note>
        <Note type="tip">
          {t('Default credentials: admin / admin123')}
        </Note>
      </div>
    </div>
  );
}
