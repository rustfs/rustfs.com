'use client'

import features from '@/data/features';
import { cn } from '@/lib/utils';
import { ActivityIcon, BotIcon, BoxesIcon, CheckIcon, DatabaseIcon, ServerIcon, ShieldCheckIcon, TerminalIcon } from "lucide-react";
import { useState, type KeyboardEvent } from 'react';
import { DataFlowLine } from './data-flow-motion';
import HomeSectionHeader from './home-section-header';

function FeaturePreview({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const variant = index % 8;

  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden bg-background/70", className)}>
      <div className="relative h-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
        />

        {variant === 0 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="w-full">
              <div className="grid grid-cols-[5rem_auto_1fr] items-center gap-3">
                <div className="grid h-20 place-items-center border border-border bg-card">
                  <DatabaseIcon className="size-5 text-brand" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Object</span>
                </div>
                <DataFlowLine direction="horizontal" className="w-8 sm:w-12" />
                <div className="grid grid-cols-3 gap-2">
                  {["D1", "D2", "D3", "D4", "P1", "P2"].map((shard, shardIndex) => (
                    <span
                      key={shard}
                      className={cn(
                        "grid h-11 place-items-center border bg-card font-mono text-[10px] font-semibold",
                        shardIndex > 3 ? "border-brand/60 bg-brand/15 text-brand" : "border-border text-foreground"
                      )}
                    >
                      {shard}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 border border-border bg-card text-center font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                <span className="px-2 py-3">4 data</span>
                <span className="border-x border-border px-2 py-3">2 parity</span>
                <span className="px-2 py-3 text-brand">repairable</span>
              </div>
            </div>
          </div>
        )}

        {variant === 1 && (
          <div className="relative flex h-full flex-col justify-center p-6 sm:p-8">
            <div className="relative grid grid-cols-4 gap-2 pt-5 sm:gap-3">
              <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-border" />
              <DataFlowLine direction="horizontal" className="absolute left-[12.5%] right-[12.5%] top-0 w-auto" />
              {[1, 2, 3, 4].map((node) => (
                <div key={node} className="relative border border-border bg-card p-2 before:absolute before:-top-5 before:left-1/2 before:h-5 before:w-px before:bg-border">
                  <div className="flex h-10 items-center justify-center gap-2 border border-border bg-background">
                    <ServerIcon className="size-3.5 text-brand" />
                    <span className="font-mono text-[9px] font-semibold text-foreground">N{node}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {[1, 2, 3, 4].map((disk) => (
                      <span key={disk} className="h-3 border border-border bg-muted/40" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border border-border bg-card px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              <span>4 nodes / 16 disks</span>
              <span className="flex items-center gap-2 text-brand"><span className="size-1.5 bg-brand" /> quorum healthy</span>
            </div>
          </div>
        )}

        {variant === 2 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="w-full">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                {["Pool A", "Pool B"].map((pool, poolIndex) => (
                  <div key={pool} className={cn("border bg-card p-3", poolIndex === 1 ? "border-brand/60" : "border-border")}>
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                      <span>{pool}</span>
                      <span>{poolIndex === 0 ? "82%" : "34%"}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((disk) => (
                        <span key={disk} className={cn("h-12 border", poolIndex === 1 && disk < 3 ? "border-brand/50 bg-brand/15" : "border-border bg-background")} />
                      ))}
                    </div>
                  </div>
                )).flatMap((pool, poolIndex) => poolIndex === 0 ? [pool, <DataFlowLine key="pool-flow" direction="horizontal" className="w-8 sm:w-12" />] : [pool])}
              </div>
              <div className="mt-5 border border-border bg-card p-3">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Live rebalance</span>
                  <span className="text-brand">68%</span>
                </div>
                <div className="mt-2 h-1 bg-border"><span className="block h-full w-[68%] bg-brand" /></div>
              </div>
            </div>
          </div>
        )}

        {variant === 3 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="relative w-full">
              <div className="absolute left-[18%] right-[18%] top-1/2 h-px bg-border" />
              <DataFlowLine direction="horizontal" className="absolute left-[18%] right-[18%] top-1/2 w-auto" />
              <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="grid gap-2">
                  {["S3", "Swift", "MCP"].map((protocol) => (
                    <span key={protocol} className="border border-border bg-card px-3 py-2 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{protocol}</span>
                  ))}
                </div>
                <div className="grid size-20 place-items-center border border-brand bg-brand/15 text-center">
                  <DatabaseIcon className="size-5 text-brand" />
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand">RustFS</span>
                </div>
                <div className="grid gap-2">
                  {["FTP(S)", "WebDAV", "SDK"].map((protocol) => (
                    <span key={protocol} className="border border-border bg-card px-3 py-2 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{protocol}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {variant === 4 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="mx-auto w-full max-w-md border border-border bg-card p-3">
              <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Audit boundary</span>
              <div className="mt-3 border border-border bg-background/80 p-3">
                <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">IAM + OIDC</span>
                <div className="mt-3 border border-brand/50 bg-brand/10 p-3">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-brand">mTLS</span>
                  <div className="mt-3 flex items-center justify-center gap-3 border border-brand bg-card px-4 py-2">
                    <ShieldCheckIcon className="size-5 text-brand" />
                    <div>
                      <p className="font-mono text-[10px] font-semibold text-foreground">KMS</p>
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">encrypted data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {variant === 5 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="grid w-full grid-cols-[1.35fr_0.65fr] gap-3">
              <div className="flex h-full flex-col border border-border bg-card p-4">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span className="flex items-center gap-2"><ActivityIcon className="size-3 text-brand" /> request rate</span>
                  <span className="text-brand">healthy</span>
                </div>
                <svg viewBox="0 0 240 96" preserveAspectRatio="none" className="mt-3 min-h-32 w-full flex-1" fill="none">
                  <path d="M0 80H240M0 48H240M0 16H240" stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <path d="M0 74L24 65L48 69L72 42L96 51L120 24L144 37L168 20L192 45L216 31L240 34" stroke="var(--color-brand)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <path d="M0 74L24 65L48 69L72 42L96 51L120 24L144 37L168 20L192 45L216 31L240 34V96H0Z" fill="var(--color-brand)" fillOpacity="0.08" />
                </svg>
              </div>
              <div className="grid gap-3">
                {[["capacity", "68%"], ["p95", "18ms"], ["nodes", "4/4"]].map(([label, value]) => (
                  <div key={label} className="border border-border bg-card p-3">
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
                    <p className="mt-2 font-mono text-sm font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {variant === 6 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="w-full">
              <div className="mx-auto flex max-w-xs items-center justify-center gap-3 border border-border bg-card px-4 py-3">
                <BoxesIcon className="size-4 text-brand" />
                <code className="text-[10px] text-foreground">helm install rustfs</code>
              </div>
              <DataFlowLine direction="vertical" className="mx-auto h-7" />
              <div className="border border-brand/50 bg-brand/5 p-3">
                <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Kubernetes cluster</span>
                  <span className="text-brand">ready 4/4</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((pod) => (
                    <span key={pod} className="grid h-12 place-items-center border border-border bg-card font-mono text-[9px] text-muted-foreground">pod-{pod}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {variant === 7 && (
          <div className="relative flex h-full items-center p-6 sm:p-8">
            <div className="w-full">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="border border-border bg-card p-3">
                  <div className="flex items-center gap-2 text-brand"><BotIcon className="size-4" /><span className="font-mono text-[9px] uppercase tracking-[0.12em]">Agent</span></div>
                  <div className="mt-3 space-y-2 font-mono text-[9px] text-muted-foreground">
                    <p><span className="text-brand">›</span> list buckets</p>
                    <p><span className="text-brand">›</span> check health</p>
                  </div>
                </div>
                <DataFlowLine direction="horizontal" className="w-8 sm:w-12" />
                <div className="grid h-full min-h-24 place-items-center border border-brand/60 bg-brand/10 text-center">
                  <TerminalIcon className="size-5 text-brand" />
                  <div>
                    <p className="font-mono text-[10px] font-semibold text-foreground">rc + MCP</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">RustFS tools</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-px bg-border font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                {["discover", "inspect", "orchestrate"].map((action) => (
                  <span key={action} className="bg-card px-2 py-3 text-center"><CheckIcon className="mx-auto mb-1 size-3 text-brand" />{action}</span>
                ))}
              </div>
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
                className="h-full min-h-72"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
