export default function HomeStats() {
  return (
    <section
      className="relative overflow-hidden bg-primary text-primary-foreground py-32"
    // style={{
    //   backgroundImage: "url('/svgs/backgrounds/gradient-1.svg')",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat"
    // }}
    >
      {/* Features */}
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-20">
          <h2 className="text-3xl font-bold tracking-wide md:text-4xl md:leading-tight ">
            强大的性能，卓越的安全性
          </h2>
          <p className="mt-4 text-muted">
            RustFS 提供高性能，高安全性，高并发, 为您的业务提供强大的支持
          </p>
        </div>
        {/* Grid */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            {/* Stats */}
            <div className="lg:pe-6 xl:pe-12">
              <p className="text-8xl font-bold leading-10">
                92%
                <span className="ms-1 inline-flex items-center gap-x-1 rounded-full bg-background px-4 py-2 text-xs font-medium leading-4 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300">
                  <svg
                    className="size-4 shrink-0"
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
              <p className="mt-6">
                来自 Rust 的高安全性，高并发的性能提升
              </p>
            </div>
            {/* End Stats */}
          </div>
          {/* End Col */}

          <div className="relative lg:col-span-8 lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gray-200 lg:before:dark:bg-neutral-700">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
              {/* Stats */}
              <div>
                <p className="text-5xl font-semibold">99.99%</p>
                <p className="mt-1">
                  数据读写成功率
                </p>
              </div>
              {/* End Stats */}
              {/* Stats */}
              <div>
                <p className="text-5xl font-semibold">100%</p>
                <p className="mt-1">
                  S3 兼容性
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-5xl font-semibold">95%</p>
                <p className="mt-1">
                  用户满意度
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-5xl font-semibold">0</p>
                <p className="mt-1">
                  知识产权风险
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-5xl font-semibold">～1 天</p>
                <p className="mt-1">
                  GitHub Issues 平均解决时间
                </p>
              </div>
              {/* End Stats */}

              {/* Stats */}
              <div>
                <p className="text-5xl font-semibold">1000+</p>
                <p className="mt-1">
                  GitHub 提交
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
    </section>
  )
}
