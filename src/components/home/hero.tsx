import AnimatedGridPattern from "@components/ui/animated-grid-pattern"
import clsx from "clsx"
import { ArrowRightIcon, BoxesIcon, ChevronRightIcon, ClockArrowUpIcon, MousePointerClickIcon, ShieldCheckIcon, SparkleIcon } from "lucide-react"
import AnimatedGradientText from "../ui/animated-gradient-text"
import Globe from "../ui/globe"
import GradualSpacing from '../ui/gradual-spacing'

const FEATURES = [
  {
    icon: MousePointerClickIcon,
    title: "简单",
  },
  {
    icon: ClockArrowUpIcon,
    title: "高效",
  },
  {
    icon: ShieldCheckIcon,
    title: "安全",
  },
  {
    icon: BoxesIcon,
    title: "云原生",
  },
];

export default function HomeHero() {
  return (
    <section className="relative pt-16 md:pt-0 md:h-screen border-b dark:border-neutral-800 overflow-hidden flex flex-col justify-center items-center">
      {/* Animated grid pattern */}
      <AnimatedGridPattern
        numSquares={300}
        maxOpacity={0.1}
        duration={1}
        repeatDelay={1}
        className={clsx(
          "[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%]",
        )}
      />

      {/* Globe */}
      <Globe className="absolute bottom-0 w-full max-w-full mt-[30vh]" />

      <div className="relative px-4 mx-auto max-w-screen-xl text-center py-8 md:py-12 lg:py-20 xl:py-24 lg:px-12 z-10 flex flex-col items-center justify-center gap-8 lg:gap-12">
        {/* Alert message */}
        <a
          href="#"
          role="alert"
        >
          <AnimatedGradientText className="inline-flex items-center justify-center px-4 py-1 bg-transparent transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            🎉 <hr className="mx-1 md:mx-2 h-4 w-px shrink-0 bg-neutral-300" />{" "}
            <span
              className={clsx(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent truncate`,
              )}
            >
              RustFS 1.0 发布，支持国产保密设备和系统
            </span>
            <ChevronRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </a>

        {/* End Alert messageAlert message */}

        {/* Hero Title */}
        <div className="space-y-2 md:space-y-4 lg:space-y-6">
          <div>
            <GradualSpacing className="text-2xl md:text-6xl lg:text-7xl font-extrabold -tracking-widest lg:-tracking-wide leading-none text-neutral-900 dark:text-white" text="支持 AI 和无限扩容的" />
            <GradualSpacing className="text-xl md:text-6xl lg:text-7xl font-extrabold -tracking-widest lg:-tracking-wide leading-none text-blue-500" text='高性能分布式存储' />
          </div>
          <p className="text-xs lg:text-lg font-normal text-neutral-500 sm:px-16 xl:px-48 dark:text-neutral-400">
            RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。
          </p>
        </div>
        {/* End Hero Title */}

        {/* CTA */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href="#" className='relative py-3 px-8 shadow-xl inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'>
            在线体验
            <SparkleIcon className="size-4" />
          </a>

          <a href="#" className='relative py-3 px-8 shadow-xl inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-white text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none'>
            免费下载
            <ArrowRightIcon className="size-4" />
          </a>
        </div>
        {/* End CTA */}

        {/* Features */}
        {/* <span className="font-semibold text-neutral-400 uppercase">FEATURED IN</span> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-16 justify-center items-center text-neutral-500 sm:justify-between">
          {
            FEATURES.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="group flex flex-wrap items-center gap-4 lg:gap-6 cursor-pointer text-neutral-800 hover:text-neutral-600 dark:hover:text-neutral-400"
              >
                <div className="p-2 rounded-full bg-neutral-800 dark:bg-neutral-600 text-neutral-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 md:w-6 md:h-6 group-hover:text-neutral-400" />
                </div>
                <span className="font-bold text-2xl">{title}</span>
              </div>
            ))
          }
        </div>
        {/* End Features */}
      </div>
    </section >
  )
}
