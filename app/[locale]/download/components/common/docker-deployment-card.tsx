'use client'

import { type PlatformVariant } from "@/data/platforms";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import CodeBlock from "../code-block";
import NotesSection from "../notes-section";

interface DockerDeploymentCardProps {
  variant: PlatformVariant;
  className?: string;
}

export default function DockerDeploymentCard({ variant, className }: DockerDeploymentCardProps) {
  const t = useTranslations();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-foreground">{variant.name}</h4>
          <p className="text-sm text-muted-foreground">
            {t('download.version')}: {variant.architecture}
          </p>
        </div>
        <a
          href={variant.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <ExternalLinkIcon className="w-4 h-4" />
          <span>{t('download.view')}</span>
        </a>
      </div>

      <CodeBlock code={variant.commands} title={t('download.dockerCommands')} />

      {/* Variant Notes */}
      {variant.notes && <NotesSection notes={variant.notes} />}
    </div>
  );
}
