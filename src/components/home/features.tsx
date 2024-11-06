import features from '@/data/features'
import clsx from 'clsx'
import { CheckCircleIcon, QuoteIcon } from "lucide-react"
import { useState } from "react"
import GridPattern from "../ui/animated-grid-pattern"

export default function HomeFeatures() {
  const [currentFeature, setCurrentFeature] = useState(features[0]);

  return (
    <>
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20 relative overflow-hidden">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            基于 Rust 的超强性能<br /><span className="text-blue-500">最靠谱的分布式文件系统</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {/* 我们的产品已经被超过 99,000 位用户选择，我们的产品值得信赖 */}
          </p>
        </div>
        {/* End Title */}

        {/* Icon Blocks */}
        <div className="z-50 relative">
          <div className="lg:py-10 lg:px-8  max-w-[85rem] lg:border-b mx-auto grid grid-cols-3 lg:grid-cols-6 items-center gap-2 md:gap-4">
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

          <div className="mt-4 md:mt-0 w-full relative overflow-hidden">
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
            <div className="max-w-[85rem] mx-auto lg:py-12 lg:px-20 md:flex gap-4 relative z-20">
              <div className="flex-1 flex flex-col p-4 lg:p-8 border bg-white dark:bg-neutral-800 rounded-xl">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-neutral-800 dark:text-white">{currentFeature.title}</h4>
                  <p className="mt-4 text-muted-foreground">
                  </p>
                  <h3 className="mt-2 lg:mt-6 text-muted-foreground">
                    {currentFeature.featureDescription}
                  </h3>
                  <ul className="mt-4 text-muted-foreground flex flex-col gap-4">
                    {currentFeature.features.map((feature) => (
                      <li className="flex md:items-center gap-2" key={feature}>
                        <CheckCircleIcon className="mt-1 flex-shrink-0 md:mt-0 size-4 text-blue-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t dark:border-neutral-700"></div>
                <div className="md:flex items-center gap-2 mt-4 relative">
                  <QuoteIcon className="w-6 h-6 text-blue-500 dark:text-blue-500 opacity-15 rotate-180" />
                  <p className="text-muted-foreground ml-4">{currentFeature.review.review}</p>
                  <div className="ml-auto flex items-center justify-end gap-2">
                    <div className="flex flex-col text-right">
                      <figcaption className="text-sm font-medium dark:text-white">
                        {currentFeature.review.name}
                      </figcaption>
                      <p className="text-xs font-medium text-muted-foreground">
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

              <div className="md:w-96 mt-6 lg:mt-0 bg-white dark:bg-neutral-800 p-4 lg:p-12 rounded-xl shadow-xl">
                {/* Description */}
                <div className="mt-6 relative">
                  <p className="mt-4 text-muted-foreground lg:min-h-48">
                    {currentFeature.description}
                  </p>
                </div>

                <a href={currentFeature.url} className="mt-6 block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
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
