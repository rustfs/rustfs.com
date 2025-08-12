'use client'

import { useTranslations } from "@/lib/i18n";
import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { useMemo } from "react";
import { type PlatformInfoData } from "./platform-info";

export function usePlatformConfig() {
  const { t } = useTranslations('download');

  const platforms = useMemo((): PlatformInfoData[] => [
    {
      id: "linux",
      name: t('Linux'),
      icon: <LinuxIcon className="w-6 h-6" />,
      description: {
        zh: t('Ubuntu 18.04+, CentOS 7+, and other Linux distributions'),
        en: t('Ubuntu 18.04+, CentOS 7+, and other Linux distributions'),
      },
      available: true,
    },
    {
      id: "docker",
      name: t('Docker'),
      icon: <DockerIcon className="w-6 h-6" />,
      description: {
        zh: t('Docker 20.10+ with containerized deployment'),
        en: t('Docker 20.10+ with containerized deployment'),
      },
      available: true,
    },
    {
      id: "macos",
      name: t('macOS'),
      icon: <AppleIcon className="w-6 h-6" />,
      description: {
        zh: t('macOS 10.15+ with native binary support'),
        en: t('macOS 10.15+ with native binary support'),
      },
      available: true,
    },
    {
      id: "windows",
      name: t('Windows'),
      icon: <WindowsIcon className="w-6 h-6" />,
      description: {
        zh: t('Windows 10/11 with native binary support'),
        en: t('Windows 10/11 with native binary support'),
      },
      available: false,
      comingSoon: true,
    },
  ], [t]);

  return platforms;
}
