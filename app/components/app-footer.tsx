import { Logo } from '@/app/components/logo'
import Link from 'next/link'
import LinkGitHub from './buttons/link-github'
import LinkTwitter from './buttons/link-twitter'

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
              <LinkTwitter />
              <LinkGitHub />
            </div>
            {/* End Social Brands */}
          </div>
          {/* End Col */}
        </div>
      </div>
    </footer>
  )
}
