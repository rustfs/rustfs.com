import { CheckIcon, XIcon } from "lucide-react"

export default function HomePricing() {
  return (
    <>
      {/* Features */}
      <div className="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            与其他存储产品的对比
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            选择 RustFS，您将获得更多的优势
          </p>
        </div>

        <div className="relative flex w-full flex-col gap-6 lg:flex-row xl:mx-auto xl:w-10/12">
          <div className="relative rounded-xl border bg-white md:w-1/2 lg:text-right dark:bg-neutral-800">
            <h3 className="p-4 text-xl font-semibold lg:p-8 lg:text-3xl">其他对象存储</h3>
            <div className="text-muted-foreground">
              <div className="flex items-center gap-2 bg-neutral-100 p-4 md:flex-row-reverse lg:px-8 dark:bg-neutral-900">
                <XIcon className="text-neutral-500" />
                <span>使用 Go 或者 C 语言开发，内存垃圾回收异常 / 内存泄漏等</span>
              </div>
              <div className="flex items-center gap-2 p-4 md:flex-row-reverse lg:px-8 ">
                <XIcon className="text-neutral-500" />
                <span>向其他第三国上报日志，违反国家安全法</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 p-4 md:flex-row-reverse lg:px-8 dark:bg-neutral-900">
                <XIcon className="text-neutral-500" />
                <span>AGPL V3 等协议、污染开源和协议陷阱，侵犯知识产权</span>
              </div>
              <div className="flex items-center gap-2 p-4 md:flex-row-reverse lg:px-8 ">
                <XIcon className="text-neutral-500" />
                <span> S3 支持和功能完善，不支持中国云厂商</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 p-4 md:flex-row-reverse lg:px-8 dark:bg-neutral-900">
                <XIcon className="text-neutral-500" />
                <span>不完全支持国产信创设备</span>
              </div>
              <div className="flex items-center gap-2 p-4 md:flex-row-reverse lg:px-8 ">
                <XIcon className="text-neutral-500" />
                <span>每年涨价，价格高达数百万人民币</span>
              </div>
            </div>

            <div className="absolute bottom-0 start-0 hidden -translate-x-16 translate-y-16 md:block">
              <svg
                className="h-auto w-56 text-cyan-500"
                width={347}
                height={188}
                viewBox="0 0 347 188"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                  stroke="currentColor"
                  strokeWidth={7}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="relative rounded-xl border bg-white text-left md:w-1/2 dark:bg-neutral-800">
            <h3 className="p-4 text-xl font-semibold lg:p-8 lg:text-3xl">RustFS</h3>
            <div className="text-muted-foreground">
              <div className="flex items-center gap-2 bg-neutral-100 p-4 lg:px-8 dark:bg-neutral-900">
                <CheckIcon className="text-green-500" />
                <span>基于 Rust 语言开发，内存更安全</span>
              </div>
              <div className="flex items-center gap-2 p-4 lg:px-8 ">
                <CheckIcon className="text-green-500" />
                <span>不向其他第三国上报日志</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 p-4 lg:px-8 dark:bg-neutral-900">
                <CheckIcon className="text-green-500" />
                <span>Apache协议，商用支持更友好</span>
              </div>
              <div className="flex items-center gap-2 p-4 lg:px-8 ">
                <CheckIcon className="text-green-500" />
                <span>S3 支持和功能完善，支持国内云厂商</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 p-4 lg:px-8 dark:bg-neutral-900">
                <CheckIcon className="text-green-500" />
                <span>支持国产信创设备和保密系统</span>
              </div>
              <div className="flex items-center gap-2 p-4 lg:px-8 ">
                <CheckIcon className="text-green-500" />
                <span>商用和技术支持和价格稳定</span>
              </div>
            </div>

            <span className="absolute end-0 top-0 rounded-es-xl rounded-se-xl bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
              最佳选择
            </span>

            <div className="absolute end-0 top-0 hidden translate-x-16 translate-y-16 md:block">
              <svg
                className="h-auto w-16 text-orange-500"
                width={121}
                height={135}
                viewBox="0 0 121 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-7 text-center">
          <p className="text-xs text-neutral-400"> * 以上对比仅供参考，具体以实际情况为准</p>
        </div>
        {/* End Features */}
      </div>
    </>
  )
}
