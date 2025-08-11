'use client'

import { getAllPlatforms, type PlatformInfo } from "@/data/platforms";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

interface PlatformSelectorProps {
  selectedPlatform: PlatformInfo | null;
  onPlatformChange: (platform: PlatformInfo) => void;
  className?: string;
}

export default function PlatformSelector({
  selectedPlatform,
  onPlatformChange,
  className
}: PlatformSelectorProps) {
  const t = useTranslations();
  const locale = useLocale();
  const allPlatforms = getAllPlatforms();

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <h2 className="text-xl font-semibold text-foreground">
        {t('download.choosePlatform')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allPlatforms.map((platform) => {
          const isAvailable = platform.available;
          const isSelected = selectedPlatform?.id === platform.id;

          return (
            <button
              key={platform.id}
              onClick={() => isAvailable && onPlatformChange(platform)}
              disabled={!isAvailable}
              className={cn(
                "flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-200",
                isAvailable
                  ? cn(
                    "hover:shadow-md cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-muted-foreground/50"
                  )
                  : "border-dashed border-muted-foreground/30 bg-muted/30 opacity-60 cursor-not-allowed"
              )}
            >
              <div className={cn(
                "w-12 h-12 mb-3 flex items-center justify-center",
                isAvailable ? "text-foreground" : "text-muted-foreground"
              )}>
                <div className={cn(isAvailable ? "" : "opacity-50")}>
                  {platform.icon}
                </div>
              </div>
              <span className={cn(
                "font-medium",
                isAvailable ? "text-foreground" : "text-muted-foreground"
              )}>
                {platform.name}
              </span>
              <span className="text-sm text-muted-foreground mt-1 text-center">
                {isAvailable
                  ? platform.description[locale as 'zh' | 'en']
                  : t('download.comingSoon')
                }
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
