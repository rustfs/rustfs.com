'use client'

import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useMemo } from "react";

const markers = [
  { location: [14.5995, 120.9842] as [number, number], size: 0.03 },
  { location: [19.076, 72.8777] as [number, number], size: 0.1 },
  { location: [23.8103, 90.4125] as [number, number], size: 0.05 },
  { location: [30.0444, 31.2357] as [number, number], size: 0.07 },
  { location: [39.9042, 116.4074] as [number, number], size: 0.08 },
  { location: [-23.5505, -46.6333] as [number, number], size: 0.1 },
  { location: [19.4326, -99.1332] as [number, number], size: 0.1 },
  { location: [40.7128, -74.006] as [number, number], size: 0.1 },
  { location: [34.6937, 135.5022] as [number, number], size: 0.05 },
  { location: [41.0082, 28.9784] as [number, number], size: 0.06 },
  { location: [22.5431, 114.0579] as [number, number], size: 0.08 },
  { location: [31.2304, 121.4737] as [number, number], size: 0.08 },
  { location: [30.6624, 104.0633] as [number, number], size: 0.07 },
  { location: [34.0522, -118.2437] as [number, number], size: 0.1 },
  { location: [43.6532, -79.3832] as [number, number], size: 0.08 },
  { location: [1.3521, 103.8198] as [number, number], size: 0.07 },
];

interface GlobePanelProps {
  className?: string;
  globeClassName?: string;
}

export default function GlobePanel({ className, globeClassName }: GlobePanelProps) {
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme ?? theme ?? "dark") !== "light";

  const globeConfig = useMemo(
    () => ({
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.2 : 0.8,
      mapBrightness: 1.2,
      baseColor: isDark
        ? ([0.7, 0.85, 1] as [number, number, number])
        : ([1, 1, 1] as [number, number, number]),
      markerColor: [251 / 255, 100 / 255, 21 / 255] as [
        number,
        number,
        number
      ],
      glowColor: isDark
        ? ([0.6, 0.75, 1] as [number, number, number])
        : ([1, 1, 1] as [number, number, number]),
      mapSamples: 16000,
      devicePixelRatio: 2,
      onRender: () => { },
      markers,
    }),
    [isDark]
  );

  return (
    <div className={cn("relative min-h-[28rem] overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      <div className="relative flex min-h-[inherit] items-center justify-center">
        <div className={cn("relative aspect-square w-full max-w-[560px]", globeClassName)}>
          <Globe className="h-full w-full opacity-90" config={globeConfig} />
        </div>
      </div>
    </div>
  )
}
