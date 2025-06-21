import { ChevronRightIcon, EarthIcon, EarthLockIcon, HexagonIcon } from "lucide-react";

export default function HomeFeatures2() {
  return (
    <section className="relative pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          <div className="relative lg:w-3/4">
            <h2 className="text-3xl font-bold text-neutral-800 lg:text-4xl dark:text-white">
              真正的多云存储
            </h2>
            <p className="text-muted-foreground mt-3">
              多云对象存储允许企业在任何云上构建与 AWS S3 兼容的数据基础设施。结果是数据和应用程序的一致、可移植的接口 - 这意味着您可以在任何地方运行，从边缘到公共云，而无需更改一行代码。
            </p>
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-blue-500"
                href="#contact"
              >
                联系我们获取更多信息
                <ChevronRightIcon className="size-4" />
              </a>
            </p>

            <div
              className="absolute bottom-0 start-0 hidden lg:block lg:translate-x-32"
              aria-hidden="true"
            >
              <svg
                className="h-auto w-40 sm:w-72"
                width={1115}
                height={636}
                viewBox="0 0 1115 636"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.990203 279.321C-1.11035 287.334 3.68307 295.534 11.6966 297.634L142.285 331.865C150.298 333.965 158.497 329.172 160.598 321.158C162.699 313.145 157.905 304.946 149.892 302.845L33.8132 272.418L64.2403 156.339C66.3409 148.326 61.5475 140.127 53.5339 138.026C45.5204 135.926 37.3213 140.719 35.2207 148.733L0.990203 279.321ZM424.31 252.289C431.581 256.26 440.694 253.585 444.664 246.314C448.635 239.044 445.961 229.931 438.69 225.96L424.31 252.289ZM23.0706 296.074C72.7581 267.025 123.056 230.059 187.043 212.864C249.583 196.057 325.63 198.393 424.31 252.289L438.69 225.96C333.77 168.656 249.817 164.929 179.257 183.892C110.144 202.465 54.2419 243.099 7.92943 270.175L23.0706 296.074Z"
                  fill="currentColor"
                  className="fill-orange-500"
                />
                <path
                  d="M451.609 382.417C446.219 388.708 446.95 398.178 453.241 403.567L555.763 491.398C562.054 496.788 571.524 496.057 576.913 489.766C582.303 483.474 581.572 474.005 575.281 468.615L484.15 390.544L562.222 299.413C567.612 293.122 566.881 283.652 560.59 278.263C554.299 272.873 544.829 273.604 539.44 279.895L451.609 382.417ZM837.202 559.655C841.706 566.608 850.994 568.593 857.947 564.09C864.9 559.586 866.885 550.298 862.381 543.345L837.202 559.655ZM464.154 407.131C508.387 403.718 570.802 395.25 638.136 410.928C704.591 426.401 776.318 465.66 837.202 559.655L862.381 543.345C797.144 442.631 718.724 398.89 644.939 381.709C572.033 364.734 504.114 373.958 461.846 377.22L464.154 407.131Z"
                  fill="currentColor"
                  className="fill-cyan-500"
                />
                <path
                  d="M447.448 0.194357C439.203 -0.605554 431.87 5.43034 431.07 13.6759L418.035 148.045C417.235 156.291 423.271 163.623 431.516 164.423C439.762 165.223 447.095 159.187 447.895 150.942L459.482 31.5025L578.921 43.0895C587.166 43.8894 594.499 37.8535 595.299 29.6079C596.099 21.3624 590.063 14.0296 581.818 13.2297L447.448 0.194357ZM1086.03 431.727C1089.68 439.166 1098.66 442.239 1106.1 438.593C1113.54 434.946 1116.62 425.96 1112.97 418.521L1086.03 431.727ZM434.419 24.6572C449.463 42.934 474.586 81.0463 521.375 116.908C568.556 153.07 637.546 187.063 742.018 200.993L745.982 171.256C646.454 157.985 582.444 125.917 539.625 93.0974C496.414 59.978 474.537 26.1903 457.581 5.59138L434.419 24.6572ZM742.018 200.993C939.862 227.372 1054.15 366.703 1086.03 431.727L1112.97 418.521C1077.85 346.879 956.138 199.277 745.982 171.256L742.018 200.993Z"
                  fill="currentColor"
                  className="fill-lime-500 dark:fill-white"
                />
              </svg>
            </div>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
              {/* Icon */}
              <span className="mx-auto inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-blue-500 shadow-sm lg:size-20 dark:border-neutral-700 dark:bg-neutral-900">
                <EarthIcon className="size-6 lg:size-8" />
              </span>
              <div className="grow">
                <h3 className="text-base font-semibold text-neutral-800 sm:text-lg dark:text-neutral-200">
                  公有云
                </h3>
                <p className="text-muted-foreground mt-1 text-sm lg:text-lg">
                  RustFS 由 Kubernetes 提供支持，为每个公共云提供可扩展、安全、兼容 S3 的对象存储。将自己从供应商的束缚中解放出来，并对待云的本质 - 商用计算、网络和驱动器。
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
              {/* Icon */}
              <span className="mx-auto inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-blue-500 shadow-sm lg:size-20 dark:border-neutral-700 dark:bg-neutral-900">
                <EarthLockIcon className="size-6 lg:size-8" />
              </span>
              <div className="grow">
                <h3 className="text-base font-semibold text-neutral-800 sm:text-lg dark:text-neutral-200">
                  私有云
                </h3>
                <p className="text-muted-foreground mt-1 text-sm lg:text-lg">
                  从 OpenShift 到 Tanzu，RustFS 是唯一一个作为领先 Kubernetes 发行版基础设施基础部分的对象存储。凭借其庞大的集成应用程序组合 RustFS 完善了软件定义的画面。
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
              {/* Icon */}
              <span className="mx-auto inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-blue-500 shadow-sm lg:size-20 dark:border-neutral-700 dark:bg-neutral-900">
                <HexagonIcon className="size-6 lg:size-8" />
              </span>
              <div className="grow">
                <h3 className="text-base font-semibold text-neutral-800 sm:text-lg dark:text-neutral-200">
                  边缘
                </h3>
                <p className="text-muted-foreground mt-1 text-sm lg:text-lg">
                  RustFS 多云存储的完整二进制文件不到 100MB，能够为任何地方的对象存储提供支持 - 从 ARM SOC、5G POP 和边缘缓存设备到迷你数据中心。这就是 RustFS 主导边缘存储市场的原因。
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </section>
  )
}
