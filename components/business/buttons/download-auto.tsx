'use client'

import { cn } from "@/lib/utils";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DownloadOptionKey = 'windows' | 'macos' | 'linux' | 'docker' | 'fallback';

interface DownloadOption {
  key: DownloadOptionKey;
  label: string;
  description: string;
}

const appConfig = {
  downloads: {
    windows: '/download/windows',
    macos: '/download/macos',
    linux: '/download/linux',
    docker: '/download/docker',
    fallback: '/download'
  },
  downloadOptions: [
    { key: 'windows' as const, label: 'Windows', description: 'Windows 10/11' },
    { key: 'macos' as const, label: 'macOS', description: 'macOS 10.15+' },
    { key: 'linux' as const, label: 'Linux', description: 'Ubuntu 18.04+, CentOS 7+' },
    { key: 'docker' as const, label: 'Docker', description: 'Docker 20.10+' },
    { key: 'fallback' as const, label: 'Other Platforms', description: 'View all versions' }
  ] as DownloadOption[]
};

export default function DownloadAuto({ className }: { className?: string }) {
  const { t } = useTranslations('download');
  const [selectedOption, setSelectedOption] = useState<DownloadOptionKey>('fallback');
  const [autoDetectedSystem, setAutoDetectedSystem] = useState<DownloadOptionKey>('fallback');

  useEffect(() => {
    const detectSystem = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      let detectedSystem: DownloadOptionKey = 'fallback';

      if (userAgent.includes('mac')) {
        detectedSystem = "macos";
      } else if (userAgent.includes('win')) {
        detectedSystem = "windows";
      } else if (userAgent.includes('linux')) {
        detectedSystem = "linux";
      }

      setAutoDetectedSystem(detectedSystem);
      setSelectedOption(detectedSystem);
    };

    detectSystem();
  }, []);

  const handleDownload = () => {
    const downloadUrl = appConfig.downloads[selectedOption];
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const handleOptionSelect = (optionKey: DownloadOptionKey) => {
    setSelectedOption(optionKey);
  };

  const getLabel = (key: DownloadOptionKey) => {
    switch (key) {
      case 'windows': return 'Windows';
      case 'macos': return 'macOS';
      case 'linux': return 'Linux';
      case 'docker': return 'Docker';
      case 'fallback': return t('otherPlatforms');
      default: return 'Unknown';
    }
  };

  const getDescription = (key: DownloadOptionKey) => {
    switch (key) {
      case 'windows': return t('windowsDescription');
      case 'macos': return t('macosDescription');
      case 'linux': return t('linuxDescription');
      case 'docker': return t('dockerDescription');
      case 'fallback': return t('viewAllVersions');
      default: return '';
    }
  };

  const buttonText = selectedOption === autoDetectedSystem
    ? t('downloadVersion')
    : selectedOption === 'fallback'
      ? t("downloadNow")
      : t('downloadVersion');

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* 主下载按钮 */}
      <button
        className="group inline-flex items-center justify-center rounded-l-full h-12 pl-6 pr-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 active:bg-primary/80 active:text-primary-foreground/80 focus-visible:outline-primary transition-colors"
        onClick={handleDownload}
      >
        <span className="mr-2">{buttonText}</span>
        <DownloadIcon className="h-3 w-3 flex-none" />
      </button>

      {/* 版本切换下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="inline-flex items-center justify-center rounded-r-full h-12 w-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 border-l border-primary-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            aria-label={t("selectVersion")}
          >
            <ChevronDownIcon className="h-3 w-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {appConfig.downloadOptions.map((option) => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => handleOptionSelect(option.key)}
              className={cn(
                "flex items-center gap-3 cursor-pointer",
                selectedOption === option.key && "bg-accent"
              )}
            >
              <div className="flex-1">
                <div className="font-medium">
                  {getLabel(option.key)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {getDescription(option.key)}
                  {option.key === autoDetectedSystem && t("autoDetected")}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
