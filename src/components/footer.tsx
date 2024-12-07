
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      {/* ========== FOOTER ========== */}
      <footer className="mx-auto mt-auto w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Architecture Support Column */}
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-medium">架构支持</h3>
            <ul className="space-y-2">
              <li><a href="/features/baremetal" className="text-sm text-gray-600 hover:text-gray-900">裸金属和虚拟化</a></li>
              <li><a href="/features/aliyun" className="text-sm text-gray-600 hover:text-gray-900">阿里云</a></li>
              <li><a href="/features/qcloud" className="text-sm text-gray-600 hover:text-gray-900">腾讯云</a></li>
              <li><a href="/features/huaweicloud" className="text-sm text-gray-600 hover:text-gray-900">华为云</a></li>
              <li><a href="/features/tanzu" className="text-sm text-gray-600 hover:text-gray-900">VMWare Tanzu</a></li>
              <li><a href="/features/aws-elastic" className="text-sm text-gray-600 hover:text-gray-900">国际云厂商</a></li>
            </ul>
          </div>

          {/* Product Features Column */}
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-medium">产品功能</h3>
            <ul className="space-y-2">
              <li><a href="/features/distributed" className="text-sm text-gray-600 hover:text-gray-900">分布式</a></li>
              <li><a href="/features/aliyun" className="text-sm text-gray-600 hover:text-gray-900">日志管理</a></li>
              <li><a href="/features/audit-logging" className="text-sm text-gray-600 hover:text-gray-900">版本控制</a></li>
              <li><a href="/features/s3-compatibility" className="text-sm text-gray-600 hover:text-gray-900">S3 兼容</a></li>
              <li><a href="/features/worm" className="text-sm text-gray-600 hover:text-gray-900">对象级与只读</a></li>
              <li><a href="/features/bucket-replication" className="text-sm text-gray-600 hover:text-gray-900">跨区域复制</a></li>
              <li><a href="/features/encryption" className="text-sm text-gray-600 hover:text-gray-900">加密</a></li>
              <li><a href="/features/lifecycle" className="text-sm text-gray-600 hover:text-gray-900">生命周期管理</a></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-medium">解决方案</h3>
            <ul className="space-y-2">
              <li><a href="/features/data-lake" className="text-sm text-gray-600 hover:text-gray-900">现代数据湖</a></li>
              <li><a href="/features/ai" className="text-sm text-gray-600 hover:text-gray-900">AI 和机器学习</a></li>
              <li><a href="/features/cloud-native" className="text-sm text-gray-600 hover:text-gray-900">云原生</a></li>
              <li><a href="/features/hdfs" className="text-sm text-gray-600 hover:text-gray-900">大数据计算存储分离</a></li>
              <li><a href="/features/sql" className="text-sm text-gray-600 hover:text-gray-900">SQL 支持</a></li>
              <li><a href="/features/quantitative-trading" className="text-sm text-gray-600 hover:text-gray-900">量化交易</a></li>
              <li><a href="/features/industry" className="text-sm text-gray-600 hover:text-gray-900">制造业降本</a></li>
              <li><a href="/features/cold-archiving" className="text-sm text-gray-600 hover:text-gray-900">冷归档存储</a></li>
              <li><a href="/features/video" className="text-sm text-gray-600 hover:text-gray-900">视频存储方案</a></li>
              <li><a href="/features/domestic" className="text-sm text-gray-600 hover:text-gray-900">国产信创和 SM 解决方案</a></li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-medium">关于我们</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900">关于我们</a></li>
              <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900">投资和合作</a></li>
              <li><a href="/trademark" className="text-sm text-gray-600 hover:text-gray-900">商标使用</a></li>
              <li><a href="https://github.com/rustfs/rustfs" className="text-sm text-gray-600 hover:text-gray-900">RustFS GitHub</a></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-medium">联系我们</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">hello@rustfs.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">400-033-5363</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">北京市海淀区宝盛北里唐家岭创大厦3楼</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">客服时间：9:00-18:00</span>
              </li>
            </ul>
          </div>
        </div>
        {/* End Grid */}
        <div className="mt-5 border-t border-gray-200 pt-5 dark:border-neutral-700">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="flex-none font-semibold text-black focus:opacity-80 focus:outline-none dark:text-white"
                href="#"
                aria-label="Brand"
              >京ICP备2024061305号-1</a>
              <div>
                © {year} RustFS All rights reserved.
              </div>
              <div className="space-x-4 text-sm">
                <a
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="#"
                >
                  Terms
                </a>
                <a
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="#"
                >
                  Privacy
                </a>
                <a
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="#"
                >
                  Status
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="mt-3 sm:hidden">
                <a
                  className="flex-none text-xl font-semibold text-black focus:opacity-80 focus:outline-none dark:text-white"
                  href="#"
                  aria-label="Brand"
                >
                  Brand
                </a>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm dark:text-neutral-400">
                  © 2024 Preline Labs.
                </p>
              </div>
              {/* Social Brands */}
              <div className="space-x-4">
                <a
                  className="inline-block text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="#"
                >
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  className="inline-block text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="#"
                >
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
                <a
                  className="inline-block text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="#"
                >
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                  </svg>
                </a>
              </div>
              {/* End Social Brands */}
            </div>
            {/* End Col */}
          </div>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}
    </>

  )
}
