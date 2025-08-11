import { appConfig, DownloadOptionKey } from "@/app.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function DownloadAutoButton({ className }: {
  className?: string | string[]
}) {
  const t = useTranslations();
  const [selectedOption, setSelectedOption] = useState<DownloadOptionKey>("fallback");
  const [autoDetectedSystem, setAutoDetectedSystem] = useState<DownloadOptionKey>("fallback");

  useEffect(() => {
    const detectSystem = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      let detectedSystem: DownloadOptionKey = "fallback";

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
      case 'fallback': return t('download.otherPlatforms');
      default: return 'Unknown';
    }
  };

  const getDescription = (key: DownloadOptionKey) => {
    switch (key) {
      case 'windows': return t('download.windowsDescription');
      case 'macos': return t('download.macosDescription');
      case 'linux': return t('download.linuxDescription');
      case 'docker': return t('download.dockerDescription');
      case 'fallback': return t('download.viewAllVersions');
      default: return '';
    }
  };

  const buttonText = selectedOption === autoDetectedSystem
    ? t('download.downloadVersion', { platform: getLabel(selectedOption) })
    : selectedOption === 'fallback'
      ? t("download.downloadNow")
      : t('download.downloadVersion', { platform: getLabel(selectedOption) });

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
            aria-label={t("download.selectVersion")}
          >
            <ChevronDownIcon className="h-3 w-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {appConfig.downloadOptions.map((option) => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => handleOptionSelect(option.key as DownloadOptionKey)}
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
                  {option.key === autoDetectedSystem && t("download.autoDetected")}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
