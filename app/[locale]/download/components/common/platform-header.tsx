'use client'

import { type PlatformInfo } from "@/data/platforms";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface PlatformHeaderProps {
  platform: PlatformInfo;
  className?: string;
}

export default function PlatformHeader({ platform, className }: PlatformHeaderProps) {
  const locale = useLocale();

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground">
        {platform.icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{platform.name}</h2>
        <p className="text-muted-foreground">{platform.description[locale as 'zh' | 'en']}</p>
      </div>
    </div>
  );
}
