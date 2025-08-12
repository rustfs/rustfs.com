'use client'

import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import PlatformInfo, { type PlatformInfoData } from "./platforms/platform-info";

interface PlatformSelectorProps {
  platforms: PlatformInfoData[];
  selectedPlatform: PlatformInfoData | null;
  onPlatformChange: (platform: PlatformInfoData) => void;
  className?: string;
}

export default function PlatformSelector({
  platforms,
  selectedPlatform,
  onPlatformChange,
  className
}: PlatformSelectorProps) {
  const { t } = useTranslations('download');

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <h2 className="text-xl font-semibold text-foreground">
        {t('platform_selector')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <PlatformInfo
            key={platform.id}
            data={platform}
            isSelected={selectedPlatform?.id === platform.id}
            onClick={() => platform.available && onPlatformChange(platform)}
          />
        ))}
      </div>
    </div>
  );
}
