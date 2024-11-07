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
    <section className="relative flex flex-col items-center justify-center overflow-hidden border-b pt-16 md:h-screen md:pt-0 dark:border-neutral-800">
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
      <Globe className="absolute bottom-0 mt-[30vh] w-full max-w-full" />

      <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-8 px-4 py-8 text-center md:py-12 lg:gap-12 lg:px-12 lg:py-20 xl:py-24">
        {/* Alert message */}
        <a
          href="#"
          role="alert"
        >
          <AnimatedGradientText className="inline-flex items-center justify-center bg-transparent px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            🎉 <hr className="mx-1 h-4 w-px shrink-0 bg-neutral-300 md:mx-2" />{" "}
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
            <GradualSpacing className="text-2xl font-extrabold leading-none -tracking-widest text-neutral-900 md:text-6xl lg:text-7xl lg:-tracking-wide dark:text-white" text="支持 AI 和无限扩容的" />
            <GradualSpacing className="text-xl font-extrabold leading-none -tracking-widest text-blue-500 md:text-6xl lg:text-7xl lg:-tracking-wide" text='高性能分布式存储' />
          </div>
          <p className="text-xs font-normal text-neutral-500 sm:px-16 lg:text-lg xl:px-48 dark:text-neutral-400">
            RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。
          </p>
        </div>
        {/* End Hero Title */}

        {/* CTA */}
        <div className="flex flex-col gap-4 space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16 lg:flex-row lg:gap-6">
          <a href="#" className='relative inline-flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow-xl hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
            在线体验
            <SparkleIcon className="size-4" />
          </a>

          <a href="https://tb.53kf.com/code/client/3ae82624ac86c32c1db8d311cd6d2a659/2" className='relative inline-flex items-center justify-center gap-x-2 rounded-lg bg-white px-8 py-3 text-sm font-medium text-neutral-800 shadow-xl hover:bg-neutral-100 focus:bg-neutral-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
            {/* 免费下载 */}
            免费咨询
            <ArrowRightIcon className="size-4" />
          </a>
        </div>
        {/* End CTA */}

        {/* Features */}
        {/* <span className="font-semibold text-neutral-400 uppercase">FEATURED IN</span> */}
        <div className="grid grid-cols-2 items-center justify-center gap-4 text-neutral-500 sm:justify-between lg:grid-cols-4 lg:gap-16">
          {
            FEATURES.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="group flex cursor-pointer flex-wrap items-center gap-4 text-neutral-800 hover:text-neutral-600 lg:gap-6 dark:hover:text-neutral-400"
              >
                <div className="flex items-center justify-center rounded-full bg-neutral-800 p-2 text-neutral-100 dark:bg-neutral-600">
                  <Icon className="size-4 group-hover:text-neutral-400 md:size-6" />
                </div>
                <span className="text-2xl font-bold">{title}</span>
              </div>
            ))
          }
        </div>
        {/* End Features */}
      </div>
    </section >
  )
}
