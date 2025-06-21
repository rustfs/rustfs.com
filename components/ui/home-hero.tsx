/* eslint-disable @next/next/no-img-element */
import { WordRotate } from "@/components/magicui/word-rotate";
import { PlayIcon } from "lucide-react";
import FreeChatButton from "./buttons/free-chat";

export default function HomeHero() {
  // public/svgs/softwares/*.svg
  const softwares = ['docker', 'elastic', 'grafana', 'kafka', 'mysql', 'nginx', 'postgresql', 'prometheus', 'spark', 'tensorflow', 'webhooks']

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto font-display text-5xl font-extrabold tracking-tight text-primary sm:text-7xl">
        Rust 构建的{/* */}{" "}
        <span className="relative whitespace-nowrap text-blue-600 inline-flex">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative flex">
            <WordRotate words={["高性能", "无限扩容", "安全可靠", "多云存储", "S3 兼容"]} className="min-w-[400px] pl-8 text-left" />
          </span>
        </span>{" "}
        {/* */} <br />分布式存储系统
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-secondary-foreground">
        RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <FreeChatButton />
        <a
          className="group inline-flex ring-1 items-center justify-center dark:hover:bg-slate-900 rounded-full py-2 px-4 text-sm ring-slate-200 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          <PlayIcon className="h-4" />
          <span className="ml-2">开始使用</span>
        </a>
      </div>
      <div className="mt-36 lg:mt-44">
        <p className="font-display text-base text-slate-500 font-bold">
          值得信赖的开源软件，超过 1500+ 款软件协议兼容适配
        </p>
        <ul
          role="list"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-16 xl:gap-y-6"
        >

          {softwares.map((software) => (
            <li key={software} className="flex">
              <img
                alt={software}
                loading="lazy"
                width={160}
                height={80}
                decoding="async"
                data-nimg={1}
                style={{ color: "transparent" }}
                src={`/svgs/softwares/${software}.svg`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
