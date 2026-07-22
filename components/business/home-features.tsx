'use client'

import features from '@/data/features';
import { cn } from '@/lib/utils';
import { CheckIcon } from "lucide-react";
import { useState, type KeyboardEvent } from 'react';
import HomeSectionHeader from './home-section-header';

function FeaturePreview({
  index,
  token,
  className,
}: {
  index: number;
  token: string;
  className?: string;
}) {
  const variant = index % 8;

  return (
    <div className={cn("relative overflow-hidden bg-background/70", className)}>
      {token ? (
        <code className="absolute right-3 top-3 z-10 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {token}
        </code>
      ) : null}
      <div className="relative h-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
        />

        {variant === 0 && (
          <div className="relative flex h-full items-end gap-3 p-8">
            {["h-20", "h-32", "h-16", "h-40"].map((height, barIndex) => (
              <span
                key={`${height}-${barIndex}`}
                className={cn("w-full max-w-16 border border-brand/60 bg-brand/15", height)}
              />
            ))}
            <span className="ml-auto grid size-16 place-items-center border border-border bg-card font-mono text-xs font-semibold text-brand">
              EC
            </span>
          </div>
        )}

        {variant === 1 && (
          <div className="relative flex h-full items-center justify-between px-8">
            <span className="absolute left-10 right-10 top-1/2 h-px bg-border" />
            {[1, 2, 3, 4].map((node) => (
              <span key={node} className="relative grid size-14 place-items-center border border-border bg-card font-mono text-xs text-muted-foreground">
                N{node}
              </span>
            ))}
          </div>
        )}

        {variant === 2 && (
          <div className="relative flex h-full flex-col justify-center gap-5 p-8">
            {[68, 44, 82].map((width, row) => (
              <span key={width} className="h-4 border border-border bg-card">
                <span className="block h-full bg-brand/45" style={{ width: `${width}%` }} />
                <span className="sr-only">Pool rail {row + 1}</span>
              </span>
            ))}
          </div>
        )}

        {variant === 3 && (
          <div className="relative grid h-full grid-cols-2 gap-px bg-border p-8 sm:grid-cols-4">
            {["S3", "IAM", "MCP", "OTEL"].map((item) => (
              <span key={item} className="grid place-items-center bg-card font-mono text-xs font-semibold text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        )}

        {variant === 4 && (
          <div className="relative grid h-full grid-cols-[4rem_1fr] items-center gap-6 p-8">
            <span className="grid size-16 place-items-center border border-brand bg-brand/15 font-mono text-xs font-semibold text-brand">
              KMS
            </span>
            <div className="space-y-2">
              {["IAM policy", "mTLS path", "Audit log"].map((item) => (
                <span key={item} className="flex items-center justify-between border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                  {item}
                  <CheckIcon className="size-3 text-brand" />
                </span>
              ))}
            </div>
          </div>
        )}

        {variant === 5 && (
          <div className="relative flex h-full items-end gap-3 p-8">
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
          <div className="relative flex h-full flex-col justify-center gap-5 p-8">
            <code className="border border-border bg-card px-4 py-3 text-xs text-foreground">
              helm install rustfs
            </code>
            <div className="grid grid-cols-3 gap-px bg-border">
              {["pod", "pvc", "svc"].map((item) => (
                <span key={item} className="bg-card px-4 py-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {variant === 7 && (
          <div className="relative flex h-full items-center gap-6 p-8">
            <span className="grid size-16 place-items-center border border-border bg-card font-mono text-xs font-semibold text-brand">
              rc
            </span>
            <div className="flex-1 space-y-2">
              <span className="block h-3 w-10/12 bg-foreground/20" />
              <span className="block h-3 w-7/12 bg-brand/50" />
              <span className="block h-3 w-9/12 bg-foreground/20" />
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
    <section className="relative border-t border-border bg-background pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <HomeSectionHeader
          eyebrow="Capability matrix"
          title="Core features"
          description="Production-ready capabilities for distributed, S3-compatible object storage."
        />

        <nav className="flex gap-px overflow-x-auto border border-border bg-border md:grid md:grid-cols-2 xl:grid-cols-4" aria-label="Core feature tabs" role="tablist" aria-orientation="horizontal">
          {features.map((feature, index) => (
            <button
              key={`${feature.title}-${index}`}
              id={`core-feature-tab-${index}`}
              type="button"
              className={cn(
                "group relative min-h-28 min-w-72 bg-card text-left transition-colors hover:bg-muted/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40 md:min-w-0",
                activeTab === index && "bg-muted/35"
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
                  {feature.token ? (
                    <code className="uppercase tracking-[0.12em]">{feature.token}</code>
                  ) : null}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className={cn(
                    "motion-icon-tile flex size-9 shrink-0 items-center justify-center border border-border bg-background text-foreground transition-colors",
                    activeTab === index && "border-brand bg-brand text-brand-foreground"
                  )}>
                    <feature.icon className="size-4" />
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
          className="mt-6 overflow-hidden border border-border bg-card"
          role="tabpanel"
          aria-labelledby={`core-feature-tab-${activeTab}`}
        >
          <div key={activeTab} className="motion-reveal grid lg:grid-cols-2">
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-4">
                <span className="motion-icon-tile flex size-12 items-center justify-center border border-brand bg-brand text-brand-foreground">
                  <activeFeature.icon className="size-6" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {activeFeature.plane}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground md:text-3xl">
                {activeFeature.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                {activeFeature.featureDescription}
              </p>
            </div>
            <div className="min-h-72 border-t border-border lg:border-t-0">
              <FeaturePreview
                index={activeTab}
                token={activeFeature.token}
                className="h-full min-h-72"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
