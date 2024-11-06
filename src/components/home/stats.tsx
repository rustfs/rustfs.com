export default function Stats() {
  return (
    <>
      {/* Features */}
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            强大的性能，卓越的安全性
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            RustFS 提供高性能，高安全性，高并发, 为您的业务提供强大的支持
          </p>
        </div>
        {/* Grid */}
        <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-4">
            {/* Stats */}
            <div className="lg:pe-6 xl:pe-12">
              <p className="text-6xl font-bold leading-10 text-blue-600">
                92%
                <span className="ms-1 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2 dark:bg-neutral-800 dark:text-neutral-300">
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                  +7% 读写速度
                </span>
              </p>
              <p className="mt-2 sm:mt-3 text-gray-500 dark:text-neutral-500">
                来自 Rust 的高性能，高安全性，高并发性能
              </p>
            </div>
            {/* End Stats */}
          </div>
          {/* End Col */}
          <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:dark:bg-neutral-700">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">99.99%</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  数据读写成功率
                </p>
              </div>
              {/* End Stats */}
              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">2,000+</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  企业用户
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">95%</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  用户满意度
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">10000+</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  GitHub Stars
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">～1 天</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  GitHub Issues 平均解决时间
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">5000+</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  GitHub 贡献者
                </p>
              </div>
              {/* End Stats */}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
    </>
  )
}
