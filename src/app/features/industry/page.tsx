import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '工业生产解决方案',
  description: '工业生产中海量数据的存储、质检、追踪等海量数据的长久保存，降本增效'
})

/* eslint-disable @next/next/no-img-element */
export default function Industry() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="relative bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-12.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h1 className="text-5xl font-bold">工业生产解决方案</h1>
          <p className="text-lg">
            工业生产中海量数据的存储、质检、追踪等海量数据的长久保存，降本增效
          </p>
        </div>
      </div>

      <div className="bg-muted">
        <div className="mx-auto max-w-screen-xl py-20">
          <h2 className="text-primary  text-center text-3xl font-bold">工业生产中海量数据的长久保存，给<span className="text-pink-600">成本</span>带来了巨大的<span className="text-pink-600">烦恼</span></h2>

          <div className="flex items-center gap-6 py-12 text-left">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-12/s12-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
            <div className="mt-6 flex flex-1 flex-col gap-6 text-white">
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-6">
                <img src="/images/solution/1.svg" alt="" />
                <h4 className="text-xl font-medium">生产过程质量追踪</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-300 p-6">
                <img src="/images/solution/2.svg" alt="" />
                <h4 className="text-xl font-medium">生产车间海量视频</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-green-500 to-green-300 p-6">
                <img src="/images/solution/3.svg" alt="" />
                <h4 className="text-xl font-medium">产品批次高清图片</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <h3 className="mb-10 text-center text-3xl font-bold">解决方案</h3>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">SSD 和HDD 分层存储降低成本</h4>
              <p>
                SSD提供快速的读写速度，适合需要高I/O性能的应用，而HDD则成本较低，适合大容量存储。通过将频繁访问的数据存储在SSD上，而将不经常访问的数据存储在HDD上，可以在不牺牲性能的情况下降低成本。</p>
            </div>
            <div>
              <img src="/images/s-13/s13-2.png" alt="" className="mx-auto w-full max-w-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/s-12/s12-3.png" alt="" className="mx-auto w-full max-w-lg" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">冷备存储降低成本</h4>
              <p>与传统的磁带存储相比，蓝光光盘的存储成本较低，尤其是在大量存储时。蓝光技术的成本效益使其成为大规模数据归档的理想选择。</p>
              <p>蓝光存储设备在运行时的能耗远低于硬盘驱动器（HDD）或固态驱动器（SSD），这意味着能源成本较低</p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">多云转换降低成本</h4>
              <p>
                与传统的磁带存储相比，蓝光光盘的存储成本较低，尤其是在大量存储时。蓝光技术的成本效益使其成为大规模数据归档的理想选择。</p>
              <p>蓝光存储设备在运行时的能耗远低于硬盘驱动器（HDD）或固态驱动器（SSD），这意味着能源成本较低</p>
            </div>
            <div>
              <img src="/images/s-12/s12-4.png" alt="" className="mx-auto w-full max-w-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black bg-cover bg-left bg-no-repeat py-10 xl:py-24" style={{ background: 'url(/images/s-12/banner.png);' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-12 text-center text-white">
          <h5 className="text-4xl font-bold">
            马上联系，获取降本方案
          </h5>
          <div>
            <a
              href="#"
              className="rounded-lg bg-pink-600 px-6 py-3 text-white shadow-lg hover:bg-pink-700 xl:px-12"
            >
              开始
            </a>
          </div>
        </div>
      </div>
    </div >
  )
}
