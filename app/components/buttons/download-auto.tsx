import { appConfig, DownloadOptionKey } from "@/app.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DownloadAutoButton({ className }: {
  className?: string | string[]
}) {
  const { tw } = useI18n();
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
      case 'fallback': return tw('其他平台', 'Other Platforms', 'Diğer Platformlar');
      default: return 'Unknown';
    }
  };

  const getDescription = (key: DownloadOptionKey) => {
    switch (key) {
      case 'windows': return tw('适用于 Windows 10/11', 'For Windows 10/11', 'Windows 10/11 için');
      case 'macos': return tw('适用于 macOS 10.15+', 'For macOS 10.15+', 'macOS 10.15+ için');
      case 'linux': return tw('适用于各种 Linux 发行版', 'For various Linux distributions', 'Çeşitli Linux dağıtımları için');
      case 'docker': return tw('使用 Docker 容器部署', 'Deploy using Docker containers', 'Docker konteynerları kullanarak dağıt');
      case 'fallback': return tw('查看所有可用版本', 'View all available versions', 'Tüm mevcut sürümleri görüntüle');
      default: return '';
    }
  };

  const buttonText = selectedOption === autoDetectedSystem
    ? tw(`下载 ${getLabel(selectedOption)} 版本`, `Download ${getLabel(selectedOption)} Version`, `${getLabel(selectedOption)} Sürümünü İndir`)
    : selectedOption === 'fallback'
      ? tw("立即下载", "Download Now", "Şimdi İndir")
      : tw(`下载 ${getLabel(selectedOption)} 版本`, `Download ${getLabel(selectedOption)} Version`, `${getLabel(selectedOption)} Sürümünü İndir`);

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
            aria-label={tw("选择版本", "Select Version", "Sürüm Seç")}
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
                  {option.key === autoDetectedSystem && tw(" (自动检测)", " (Auto-detected)", " (Otomatik algılandı)")}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
