
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
                <span className="text-sm text-gray-600">北京市海淀区西小口路66号中关村东升科技园北领地C区</span>
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
                  href="https://github.com/rustfs/rustfs"
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
