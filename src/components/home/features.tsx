/* eslint-disable @next/next/no-img-element */
import features from '@/data/features'
import clsx from 'clsx'
import { CheckCircleIcon, QuoteIcon } from "lucide-react"
import { useState } from "react"
import GridPattern from "../ui/animated-grid-pattern"

export default function HomeFeatures() {
  const [currentFeature, setCurrentFeature] = useState(features[0]);

  return (
    <>
      <div className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            基于 Rust 的超强性能<br /><span className="text-blue-500">最靠谱的分布式文件系统</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            {/* 我们的产品已经被超过 99,000 位用户选择，我们的产品值得信赖 */}
          </p>
        </div>
        {/* End Title */}

        {/* Icon Blocks */}
        <div className="relative z-50">
          <div className="mx-auto grid  max-w-[85rem] grid-cols-3 items-center gap-2 md:gap-4 lg:grid-cols-6 lg:border-b lg:px-8 lg:py-10">
            {/* Icon Block */}
            {features.map((feature) => (
              <div
                key={feature.title}
                className={clsx(
                  'group text-primary cursor-pointer bg-neutral-50 dark:bg-neutral-800 flex flex-col gap-4 items-center hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 rounded-xl p-2 md:p-4 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
                  { 'text-blue-500 group-hover:text-blue-600': currentFeature.title === feature.title, },
                  { 'text-neutral-500 group-hover:text-blue-600': currentFeature.title !== feature.title, },
                )}
                onClick={() => setCurrentFeature(feature)}
              >
                <feature.icon className="xl:size-12" />
                <h3 className={clsx(
                  'lg:text-lg font-semibold dark:text-white dark:group-hover:text-neutral-400',
                )}>
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="relative mt-4 w-full overflow-hidden md:mt-0">
            <GridPattern
              numSquares={300}
              maxOpacity={0.1}
              duration={1}
              repeatDelay={2}
              className={clsx(
                "[mask-image:radial-gradient(60vw_circle_at_center,white,transparent)]",
                "hidden lg:block z-10 inset-x-0 inset-y-[-10%] h-[110%]",
              )}
            />
            <div className="relative z-20 mx-auto max-w-[85rem] gap-4 md:flex lg:px-20 lg:py-12">
              <div className="flex flex-1 flex-col rounded-xl border bg-white p-4 lg:p-8 dark:bg-neutral-800">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-neutral-800 dark:text-white">{currentFeature.title}</h4>
                  <p className="text-muted-foreground mt-4">
                  </p>
                  <h3 className="text-muted-foreground mt-2 lg:mt-6">
                    {currentFeature.featureDescription}
                  </h3>
                  <ul className="text-muted-foreground mt-4 flex flex-col gap-4">
                    {currentFeature.features.map((feature) => (
                      <li className="flex gap-2 md:items-center" key={feature}>
                        <CheckCircleIcon className="mt-1 size-4 shrink-0 text-blue-500 md:mt-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t dark:border-neutral-700"></div>
                <div className="relative mt-4 items-center gap-2 md:flex">
                  <QuoteIcon className="size-6 rotate-180 text-blue-500 opacity-15 dark:text-blue-500" />
                  <p className="text-muted-foreground ml-4">{currentFeature.review.review}</p>
                  <div className="ml-auto flex items-center justify-end gap-2">
                    <div className="flex flex-col text-right">
                      <figcaption className="text-sm font-medium dark:text-white">
                        {currentFeature.review.name}
                      </figcaption>
                      <p className="text-muted-foreground text-xs font-medium">
                        {currentFeature.review.position}
                      </p>
                    </div>
                    <img
                      className="rounded-full"
                      width="36"
                      height="36"
                      alt=""
                      src={currentFeature.review.img}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white p-4 shadow-xl md:w-96 lg:mt-0 lg:p-12 dark:bg-neutral-800">
                {/* Description */}
                <div className="relative mt-6">
                  <p className="text-muted-foreground mt-4 lg:min-h-48">
                    {currentFeature.description}
                  </p>
                </div>

                <a href={currentFeature.url} className="mt-6 block rounded-lg bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600">
                  了解更多
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End Icon Blocks */}
      </div>
    </>
  )
}
