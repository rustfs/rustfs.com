'use client'

/* eslint-disable @next/next/no-img-element */
import features from '@/data/features';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, QuoteIcon } from "lucide-react";
import { useState } from 'react';

export default function HomeFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Title */}
        <div className="mx-auto mb-10 text-center lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl tracking-wide md:leading-tight dark:text-white">
            High-performance <span className="text-blue-500">enterprise-grade distributed file system</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Comprehensive features to meet enterprise-grade storage requirements
          </p>
        </div>
        {/* End Title */}

        {/* Tab Nav */}
        <nav className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
          {features.map((feature, index) => (
            <button
              key={`${feature.title}-${index}`}
              type="button"
              className={cn(
                "w-full flex flex-col gap-2 text-start hover:bg-muted focus:outline-hidden focus:bg-muted p-2 sm:p-3 md:p-5 rounded-xl",
                {
                  'bg-muted text-blue-600': activeTab === index,
                }
              )}
              onClick={() => setActiveTab(index)}
              aria-selected={activeTab === index}
              role="tab"
            >
              <div className='flex gap-4 items-center'>
                <feature.icon className={cn(
                  "shrink-0 size-5 sm:size-6 md:size-7 text-gray-800 dark:text-white",
                  {
                    'text-blue-600 dark:text-blue-500': activeTab === index,
                  }
                )} />
                <span className={cn(
                  "block font-semibold text-gray-800 dark:text-neutral-200 text-sm md:text-xl",
                  {
                    'text-blue-600 dark:text-blue-500': activeTab === index,
                  }
                )}>
                  {feature.title}
                </span>
              </div>
              <p className="hidden md:block mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </button>
          ))}
        </nav>
        {/* End Tab Nav */}

        {/* Tab Content */}
        <div className="mt-10 md:mt-16">
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-content-${index}`}
              className={cn(
                {
                  'hidden': activeTab !== index,
                }
              )}
              role="tabpanel"
            >
              {/* Feature Detail */}
              <div className="relative mt-10 md:mt-20 overflow-hidden rounded-4xl md:bg-slate-200 md:dark:bg-slate-700 md:px-6 lg:px-14 md:py-8 lg:py-16 xl:px-16">
                <div className="flex flex-col rounded-xl bg-background p-2 md:p-8 lg:p-12 shadow-xl ring-1 shadow-slate-900/5 ring-slate-500/10">
                  <div className="flex items-center gap-6 mb-6">
                    <feature.icon className="hidden md:block size-12 md:size-16 text-blue-500" />
                    <div>
                      <h4 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.featureDescription}
                      </p>
                    </div>
                  </div>

                  <ul className="text-muted-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {feature.features.map((item, itemIndex) => (
                      <li className="flex gap-3 items-start" key={itemIndex}>
                        <CheckCircleIcon className="size-5 shrink-0 text-blue-500 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t dark:border-neutral-700 pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <QuoteIcon className="size-8 rotate-180 text-blue-500 opacity-15" />
                      <p className="text-muted-foreground flex-1 text-lg italic">
                        &ldquo;{feature.review.review}&rdquo;
                      </p>
                      <div className="flex items-center gap-4 self-end">
                        <div className="text-right">
                          <p className="font-semibold text-neutral-800 dark:text-white">
                            {feature.review.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.review.position}
                          </p>
                        </div>
                        <img
                          className="rounded-full"
                          width="48"
                          height="48"
                          alt=""
                          src={feature.review.img}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-slate-900/10 ring-inset"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Tab Content */}
    </section>
  );
}
