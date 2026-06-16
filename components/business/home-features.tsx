'use client'

import features from '@/data/features';
import { cn } from '@/lib/utils';
import { CheckIcon } from "lucide-react";
import { useState } from 'react';
import HomeSectionHeader from './home-section-header';

export default function HomeFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = features[activeTab];

  return (
    <section className="relative border-t border-border pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <HomeSectionHeader
          sectionNumber="02"
          eyebrow="Capability matrix"
          title="Core features"
          description="Production-ready capabilities for distributed, S3-compatible object storage."
        />

        <nav className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-4" aria-label="Core feature tabs" role="tablist" aria-orientation="horizontal">
          {features.map((feature, index) => (
            <button
              key={`${feature.title}-${index}`}
              id={`core-feature-tab-${index}`}
              type="button"
              className={cn(
                "motion-card group relative min-h-40 bg-card text-left transition-colors hover:bg-muted/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40",
                activeTab === index && "bg-muted/35"
              )}
              onClick={() => setActiveTab(index)}
              aria-selected={activeTab === index}
              aria-controls="core-feature-panel"
              role="tab"
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 bg-transparent transition-colors",
                  activeTab === index && "bg-brand"
                )}
              />
              <div className="flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{feature.plane}</span>
                  <code className="uppercase tracking-[0.12em]">{feature.token}</code>
                </div>

                <div className="mt-7 flex items-start gap-4">
                  <span className={cn(
                    "motion-icon-tile flex size-11 shrink-0 items-center justify-center border border-border bg-background text-foreground transition-colors",
                    activeTab === index && "border-brand bg-brand text-brand-foreground"
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
          className="mt-8 border border-border bg-card"
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
            </div>
            <div>
              <ul className="grid h-full divide-y divide-border">
                {activeFeature.features.map((item) => (
                  <li className="flex min-h-20 items-center gap-4 px-5 py-4 sm:px-8" key={item}>
                    <span className="motion-icon-tile flex size-8 shrink-0 items-center justify-center border border-border bg-background text-brand">
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
