'use client'

import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface DockerDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function DockerDownloadSection({ platform, className }: DockerDownloadSectionProps) {
  const { t } = useTranslations('download');

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Docker Deployment */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">{t('Docker Deployment')}</h3>
          <a
            href="https://hub.docker.com/r/rustfs/rustfs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80">
            <span>{t('View Image')}</span>
            <ExternalLinkIcon className="w-3 h-3" />
          </a>
        </div>

        {/* Latest Stable Version */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{t('Latest Stable')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: latest
              </p>
            </div>
            <a
              href="https://hub.docker.com/r/rustfs/rustfs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "docker pull rustfs/rustfs:latest",
              "docker run -d \\",
              "  --name rustfs \\",
              "  -p 9000:9000 \\",
              "  -v /data:/data \\",
              "  rustfs/rustfs:latest",
            ]}
            title={t('Installation Commands')}
          />
        </div>

        {/* Alpha Version */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{t('Latest Alpha')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: alpha
              </p>
            </div>
            <a
              href="https://hub.docker.com/r/rustfs/rustfs/tags"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "docker pull rustfs/rustfs:alpha",
              "docker run -d \\",
              "  --name rustfs-alpha \\",
              "  -p 9000:9000 \\",
              "  -v /data:/data \\",
              "  rustfs/rustfs:alpha",
            ]}
            title={t('Installation Commands')}
          />

          <Note type="warning">
            {t('Development version - not recommended for production use')}
          </Note>
        </div>

        {/* Specific Version */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{t('Specific Version')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: 1.0.0-alpha.18
              </p>
            </div>
            <a
              href="https://hub.docker.com/r/rustfs/rustfs/tags"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "docker pull rustfs/rustfs:1.0.0-alpha.18",
              "docker run -d \\",
              "  --name rustfs-v1-0-0-alpha-18 \\",
              "  -p 9000:9000 \\",
              "  -v /data:/data \\",
              "  rustfs/rustfs:1.0.0-alpha.18",
            ]}
            title={t('Installation Commands')}
          />
        </div>

        {/* Nightly Version */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{t('Daily Build')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('Architecture')}: nightly
              </p>
            </div>
            <a
              href="https://hub.docker.com/r/rustfs/rustfs/tags"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{t('Download')}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "docker pull rustfs/rustfs:nightly",
              "docker run -d \\",
              "  --name rustfs-nightly \\",
              "  -p 9000:9000 \\",
              "  -v /data:/data \\",
              "  rustfs/rustfs:nightly",
            ]}
            title={t('Installation Commands')}
          />

          <Note type="warning">
            {t('Daily build - may contain experimental features')}
          </Note>
        </div>
      </div>

      {/* Platform Notes */}
      <div className="space-y-2">
        <Note type="tip">
          {t('Default credentials: rustfsadmin / rustfsadmin')}
        </Note>
        <Note type="info">
          <Link href="https://hub.docker.com/r/rustfs/rustfs/tags" target="_blank" className="hover:underline">
            {t('View all available versions on Docker Hub')}
          </Link>
        </Note>
        <Note type="success">
          <Link href="https://docs.rustfs.com/installation/docker" target="_blank" className="hover:underline">
            {t('View detailed Docker installation guide')}
          </Link>
        </Note>
      </div>
    </div>
  );
}
