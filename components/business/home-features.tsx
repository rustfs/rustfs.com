'use client'

import features from '@/data/features';
import { cn } from '@/lib/utils';
import { CheckIcon } from "lucide-react";
import { useState, type KeyboardEvent } from 'react';
import HomeSectionHeader from './home-section-header';

function FeaturePreview({ index, token }: { index: number; token: string }) {
  const variant = index % 8;

  return (
    <div className="mt-8 overflow-hidden border-y border-border bg-background/40">
      <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <span className="px-3 py-2">Surface preview</span>
        <code className="border-l border-border px-3 py-2 text-foreground">{token}</code>
      </div>
      <div className="relative h-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
        />

        {variant === 0 && (
          <div className="relative flex h-full items-end gap-2 p-5">
            {["h-10", "h-14", "h-8", "h-16"].map((height, barIndex) => (
              <span
                key={`${height}-${barIndex}`}
                className={cn("w-10 border border-brand/60 bg-brand/15", height)}
              />
            ))}
            <span className="ml-auto grid size-14 place-items-center border border-border bg-card font-mono text-xs font-semibold text-brand">
              EC
            </span>
          </div>
        )}

        {variant === 1 && (
          <div className="relative flex h-full items-center justify-between px-8">
            <span className="absolute left-10 right-10 top-1/2 h-px bg-border" />
            {[1, 2, 3, 4].map((node) => (
              <span key={node} className="relative grid size-12 place-items-center border border-border bg-card font-mono text-[10px] text-muted-foreground">
                N{node}
              </span>
            ))}
          </div>
        )}

        {variant === 2 && (
          <div className="relative flex h-full flex-col justify-center gap-3 p-5">
            {[68, 44, 82].map((width, row) => (
              <span key={width} className="h-3 border border-border bg-card">
                <span className="block h-full bg-brand/45" style={{ width: `${width}%` }} />
                <span className="sr-only">Pool rail {row + 1}</span>
              </span>
            ))}
          </div>
        )}

        {variant === 3 && (
          <div className="relative grid h-full grid-cols-2 gap-px bg-border p-5 sm:grid-cols-4">
            {["S3", "IAM", "MCP", "OTEL"].map((item) => (
              <span key={item} className="grid place-items-center bg-card font-mono text-xs font-semibold text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        )}

        {variant === 4 && (
          <div className="relative grid h-full grid-cols-[3rem_1fr] gap-4 p-5">
            <span className="grid size-12 place-items-center border border-brand bg-brand/15 font-mono text-xs font-semibold text-brand">
              KMS
            </span>
            <div className="space-y-2">
              {["IAM policy", "mTLS path", "Audit log"].map((item) => (
                <span key={item} className="flex items-center justify-between border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground">
                  {item}
                  <CheckIcon className="size-3 text-brand" />
                </span>
              ))}
            </div>
          </div>
        )}

        {variant === 5 && (
          <div className="relative flex h-full items-end gap-2 p-5">
            {[28, 48, 38, 72, 52, 86, 44, 62].map((height, barIndex) => (
              <span
                key={`${height}-${barIndex}`}
                className="w-full border border-border bg-card"
                style={{ height: `${height}%` }}
              >
                <span className="block h-1/2 bg-brand/35" />
              </span>
            ))}
          </div>
        )}

        {variant === 6 && (
          <div className="relative flex h-full flex-col justify-center gap-3 p-5">
            <code className="border border-border bg-card px-3 py-2 text-xs text-foreground">
              helm install rustfs
            </code>
            <div className="grid grid-cols-3 gap-px bg-border">
              {["pod", "pvc", "svc"].map((item) => (
                <span key={item} className="bg-card px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {variant === 7 && (
          <div className="relative flex h-full items-center gap-4 p-5">
            <span className="grid size-14 place-items-center border border-border bg-card font-mono text-xs font-semibold text-brand">
              rc
            </span>
            <div className="flex-1 space-y-2">
              <span className="block h-2 w-10/12 bg-foreground/20" />
              <span className="block h-2 w-7/12 bg-brand/50" />
              <span className="block h-2 w-9/12 bg-foreground/20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomeFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = features[activeTab];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % features.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + features.length) % features.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = features.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <section className="relative border-t border-border bg-background pt-20 pb-14 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-28">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <HomeSectionHeader
          sectionNumber="02"
          eyebrow="Capability matrix"
          title="Core features"
          description="Production-ready capabilities for distributed, S3-compatible object storage."
        />

        <nav className="grid gap-px border-y border-border bg-border/70 md:grid-cols-2 xl:grid-cols-4" aria-label="Core feature tabs" role="tablist" aria-orientation="horizontal">
          {features.map((feature, index) => (
            <button
              key={`${feature.title}-${index}`}
              id={`core-feature-tab-${index}`}
              type="button"
              className={cn(
                "group relative min-h-32 bg-background/85 text-left transition-colors hover:bg-muted/30 focus:outline-hidden focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-brand/40",
                activeTab === index && "bg-card/80"
              )}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              aria-selected={activeTab === index}
              aria-controls="core-feature-panel"
              role="tab"
              tabIndex={activeTab === index ? 0 : -1}
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 bg-transparent transition-colors",
                  activeTab === index && "bg-brand"
                )}
              />
              <div className="flex h-full flex-col p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{feature.plane}</span>
                  <code className="uppercase tracking-[0.12em]">{feature.token}</code>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <span className={cn(
                    "motion-icon-tile flex size-10 shrink-0 items-center justify-center border border-border/70 bg-background/40 text-foreground transition-colors",
                    activeTab === index && "border-brand/40 bg-brand/10 text-brand"
                  )}>
                    <feature.icon className="size-5" />
                  </span>
                  <span className={cn(
                    "block text-base font-semibold leading-6 text-foreground",
                    activeTab === index && "text-brand"
                  )}>
                    {feature.title}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </nav>

        <div
          id="core-feature-panel"
          className="mt-8 border border-border bg-card/45"
          role="tabpanel"
          aria-labelledby={`core-feature-tab-${activeTab}`}
        >
          <div className="grid border-b border-border text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:grid-cols-[1fr_auto] sm:tracking-[0.2em]">
            <span className="px-5 py-3 sm:px-8">
              Selected surface / {activeFeature.plane}
            </span>
            <code className="border-t border-border px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-foreground sm:border-l sm:border-t-0 sm:px-4">
              {activeFeature.token}
            </code>
          </div>

          <div key={activeTab} className="motion-reveal grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-center gap-4">
                <span className="motion-icon-tile flex size-12 items-center justify-center border border-brand bg-brand text-brand-foreground">
                  <activeFeature.icon className="size-6" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Active capability
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-foreground md:text-3xl">
                {activeFeature.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                {activeFeature.featureDescription}
              </p>
              <FeaturePreview index={activeTab} token={activeFeature.token} />
            </div>
            <div>
              <ul className="grid h-full divide-y divide-border">
                {activeFeature.features.map((item) => (
                  <li className="flex min-h-20 items-center gap-4 px-5 py-4 sm:px-8" key={item}>
                    <span className="motion-icon-tile flex size-8 shrink-0 items-center justify-center bg-brand/10 text-brand">
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium leading-6 text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
