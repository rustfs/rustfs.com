'use client'
import { WordRotate } from "@/components/magicui/word-rotate";
import { Globe } from "@/components/ui/globe";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import DemoLink from "./buttons/demo-link";
import DownloadLink from "./buttons/download-link";
import StatsStrip from "./stats-strip";
//import GetStartedButton from "./buttons/get-started";

// 导入所有软件SVG图标

export default function HomeHero({ dockerPulls }: { dockerPulls: number }) {

  const { theme } = useTheme();

  const globeConfig = useMemo(() => ({
    width: 800,
    height: 800,
    phi: 0,
    theta: 0.3,
    dark: theme === "dark" ? 1 : 0,
    diffuse: theme === "dark" ? 1.2 : 0.8,
    mapBrightness: theme === "dark" ? 1.2 : 1.2,
    baseColor: theme === "dark" ? [0.7, 0.85, 1] as [number, number, number] : [1, 1, 1] as [number, number, number],
    markerColor: [251 / 255, 100 / 255, 21 / 255] as [number, number, number],
    glowColor: theme === "dark" ? [0.6, 0.75, 1] as [number, number, number] : [1, 1, 1] as [number, number, number],
    mapSamples: 16000,
    devicePixelRatio: 2,
    onRender: () => { },
    markers: [
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
    ],
  }), [theme]);

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28">
      <div className="relative flex items-center gap-12">
        <div className="space-y-6 text-center lg:text-left relative z-20 w-3/5">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl md:text-5xl xl:text-6xl leading-tight">
            The World’s Fastest-Growing Open-Source Distributed Object Storage
          </h1>
          {/* <p className="mx-auto lg:mx-0 max-w-2xl text-lg tracking-tight text-secondary-foreground">
            RustFS is developed with the popular and secure Rust language, compatible with S3 protocol. Suitable for AI/ML and massive data storage, big data, internet, industrial and confidential storage scenarios. Significantly reduces TCO. Follows Apache 2 license, Compatible with diverse hardware ecosystems.
          </p> */}
          <div className="text-lg font-semibold text-primary/90 flex items-center justify-center lg:justify-start gap-2">
            <span>Built for</span>
            <WordRotate
              words={[
                'AI/ML Pipelines',
                'Hyper-Scale Data Lakes',
                'Multi-Cloud Storage',
                'S3-Compatible Ecosystems',
                'Enterprise Reliability'
              ]}
              className="inline-flex"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start lg:justify-start">
            <DownloadLink />
            <DemoLink className="hidden md:inline-flex" />
          </div>
        </div>

        <div className="flex items-center justify-center w-2/5">
          <div className="relative w-full max-w-[560px] md:max-w-[620px] lg:max-w-[680px] aspect-square">
            <Globe className="h-full w-full opacity-95 drop-shadow-2xl" config={globeConfig} />
          </div>
        </div>
      </div>

      <StatsStrip className="mt-6 lg:mt-8" dockerPulls={dockerPulls} />
    </section >
  )
}
