import { Logo } from '@/components/ui/logo'
import Link from 'next/link'

interface NavItem {
  title: string
  href: string
}

const navs = {
  '架构支持': [
    { title: '裸金属和虚拟化', href: 'https://docs.rustfs.com/features/baremetal' },
    { title: '阿里云', href: 'https://docs.rustfs.com/features/aliyun' },
    { title: '腾讯云', href: 'https://docs.rustfs.com/features/qcloud' },
    { title: '华为云', href: 'https://docs.rustfs.com/features/huaweicloud' },
    { title: 'VMWare Tanzu', href: 'https://docs.rustfs.com/features/tanzu' },
    { title: '国际云厂商', href: 'https://docs.rustfs.com/features/aws-elastic' },
  ],
  '产品功能': [
    { title: '分布式', href: 'https://docs.rustfs.com/features/distributed' },
    { title: '日志管理', href: 'https://docs.rustfs.com/features/aliyun' },
    { title: '版本控制', href: 'https://docs.rustfs.com/features/audit-logging' },
    { title: 'S3 兼容', href: 'https://docs.rustfs.com/features/s3-compatibility' },
    { title: '对象级与只读', href: 'https://docs.rustfs.com/features/worm' },
    { title: '跨区域复制', href: 'https://docs.rustfs.com/features/bucket-replication' },
    { title: '加密', href: 'https://docs.rustfs.com/features/encryption' },
    { title: '生命周期管理', href: 'https://docs.rustfs.com/features/lifecycle' },
  ],
  '解决方案': [
    { title: '现代数据湖', href: 'https://docs.rustfs.com/features/data-lake' },
    { title: 'AI 和机器学习', href: 'https://docs.rustfs.com/features/ai' },
    { title: '云原生', href: 'https://docs.rustfs.com/features/cloud-native' },
    { title: '大数据计算存储分离', href: 'https://docs.rustfs.com/features/hdfs' },
    { title: 'SQL 支持', href: 'https://docs.rustfs.com/features/sql' },
    { title: '量化交易', href: 'https://docs.rustfs.com/features/quantitative-trading' },
    { title: '制造业降本', href: 'https://docs.rustfs.com/features/industry' },
    { title: '冷归档存储', href: 'https://docs.rustfs.com/features/cold-archiving' },
    { title: '视频存储方案', href: 'https://docs.rustfs.com/features/video' },
    { title: '国产信创和 SM 解决方案', href: 'https://docs.rustfs.com/features/domestic' },
  ],
  '关于我们': [
    { title: '关于我们', href: 'https://docs.rustfs.com/about' },
    { title: '投资和合作', href: 'https://docs.rustfs.com/about' },
    { title: '商标使用', href: 'https://docs.rustfs.com/trademark' },
    { title: 'RustFS GitHub', href: 'https://github.com/rustfs/rustfs' },
  ],
}

export function AppFooter() {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-32 px-4 sm:px-6 lg:px-8 mx-auto border-t">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        <div className="col-span-full hidden lg:col-span-1 lg:block">
          <Logo className="flex-none h-6 w-auto" />
          <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
            © 2025 RustFS.
          </p>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">架构支持</h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['架构支持']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </p>
            ))}
          </div>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">产品功能</h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['产品功能']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </p>
            ))}
          </div>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">解决方案</h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['解决方案']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </p>
            ))}
          </div>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">关于我们</h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['关于我们']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </p>
            ))}
          </div>

          <h4 className="mt-7 text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">联系我们</h4>
          <div className="mt-3 grid space-y-3 text-sm">
            <p className="text-gray-600 dark:text-neutral-400">hello@rustfs.com</p>
            <p className="text-gray-600 dark:text-neutral-400">400-033-5363</p>
            <p className="text-gray-600 dark:text-neutral-400">北京市海淀区西小口路66号</p>
            <p className="text-gray-600 dark:text-neutral-400">客服时间：9:00-18:00</p>
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}

      <div className="pt-5 mt-5 border-t border-gray-200 dark:border-neutral-700">
        <div className="sm:flex sm:justify-between sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="space-x-4 text-sm">
              <Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="/terms">Terms</Link>
              <Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="/privacy">Privacy</Link>
              <Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="/status">Status</Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="mt-3 sm:hidden">
              <Logo className="flex-none h-6 w-auto" />
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                © 2025 RustFS.
              </p>
            </div>

            {/* Social Brands */}
            <div className="space-x-4">
              <Link className="inline-block text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://twitter.com/rustfs">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </Link>
              <Link className="inline-block text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://github.com/rustfs/rustfs">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </Link>
              <Link className="inline-block text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="/discord">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                </svg>
              </Link>
            </div>
            {/* End Social Brands */}
          </div>
          {/* End Col */}
        </div>
      </div>
    </footer>
  )
}
