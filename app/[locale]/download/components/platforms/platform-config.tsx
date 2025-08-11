'use client'

import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import LinuxIcon from "@/public/svgs/brands/linux.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type PlatformInfoData } from "./platform-info";

export function usePlatformConfig() {
  const t = useTranslations();

  const platforms = useMemo((): PlatformInfoData[] => [
    {
      id: "linux",
      name: t('download.platforms.linux.name'),
      icon: <LinuxIcon className="w-6 h-6" />,
      description: {
        zh: t('download.platforms.linux.description'),
        en: t('download.platforms.linux.description'),
      },
      available: true,
    },
    {
      id: "docker",
      name: t('download.platforms.docker.name'),
      icon: <DockerIcon className="w-6 h-6" />,
      description: {
        zh: t('download.platforms.docker.description'),
        en: t('download.platforms.docker.description'),
      },
      available: true,
    },
    {
      id: "macos",
      name: t('download.platforms.macos.name'),
      icon: <AppleIcon className="w-6 h-6" />,
      description: {
        zh: t('download.platforms.macos.description'),
        en: t('download.platforms.macos.description'),
      },
      available: true,
    },
    {
      id: "windows",
      name: t('download.platforms.windows.name'),
      icon: <WindowsIcon className="w-6 h-6" />,
      description: {
        zh: t('download.platforms.windows.description'),
        en: t('download.platforms.windows.description'),
      },
      available: false,
      comingSoon: true,
    },
  ], [t]);

  return platforms;
}
