'use client'

import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface PlatformInfoData {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: {
    zh: string;
    en: string;
  };
  available: boolean;
  comingSoon?: boolean;
}

interface PlatformInfoProps {
  data: PlatformInfoData;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PlatformInfo({ data, isSelected, onClick, className }: PlatformInfoProps) {
  const { t, locale } = useTranslations('download');
  const { name, icon, description, available, comingSoon } = data;

  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={cn(
        "flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-200",
        available
          ? cn(
            "hover:shadow-md cursor-pointer",
            isSelected
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-card hover:border-muted-foreground/50"
          )
          : "border-dashed border-muted-foreground/30 bg-muted/30 opacity-60 cursor-not-allowed",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 mb-3 flex items-center justify-center",
        available ? "text-foreground" : "text-muted-foreground"
      )}>
        <div className={cn(available ? "" : "opacity-50")}>
          {icon}
        </div>
      </div>
      <span className={cn(
        "font-medium",
        available ? "text-foreground" : "text-muted-foreground"
      )}>
        {name}
      </span>
      <span className="text-sm text-muted-foreground mt-1 text-center">
        {available
          ? description[locale as 'zh' | 'en']
          : comingSoon ? t('Coming Soon') : t('Platform not supported')
        }
      </span>
    </button>
  );
}
