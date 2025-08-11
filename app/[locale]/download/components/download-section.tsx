"use client";

import { type PlatformInfoData } from "./platforms/platform-info";
import PlatformFactory from "./platforms/platform-factory";

interface DownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function DownloadSection({ platform, className }: DownloadSectionProps) {
  return <PlatformFactory platform={platform} className={className} />;
}
