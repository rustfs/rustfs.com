'use client'

import { Logo } from '@/app/components/logo'
import { useI18n } from "@/lib/i18n"
import Link from 'next/link'
import LinkGitHub from './buttons/link-github'
import LinkTwitter from './buttons/link-twitter'

interface NavItem {
  title: { zh: string; en: string };
  href: string;
}

export function AppFooter() {
  const { tw, locale } = useI18n();

  const navs: Record<string, NavItem[]> = {
    'architecture-support': [
      { title: { zh: '裸金属和虚拟化', en: 'Bare Metal and Virtualization' }, href: `https://docs.rustfs.com/${locale}/features/baremetal` },
      { title: { zh: '阿里云', en: 'Alibaba Cloud' }, href: `https://docs.rustfs.com/${locale}/features/aliyun` },
      { title: { zh: '腾讯云', en: 'Tencent Cloud' }, href: `https://docs.rustfs.com/${locale}/features/qcloud` },
      { title: { zh: '华为云', en: 'Huawei Cloud' }, href: `https://docs.rustfs.com/${locale}/features/huaweicloud` },
      { title: { zh: 'AWS、Azure、GCP', en: 'AWS, Azure, GCP' }, href: `https://docs.rustfs.com/${locale}/features/aws-azure-gcp` },
      { title: { zh: '国际云厂商', en: 'International Cloud Providers' }, href: `https://docs.rustfs.com/${locale}/features/aws-elastic` },
    ],
    'product-features': [
      { title: { zh: '分布式', en: 'Distributed' }, href: `https://docs.rustfs.com/${locale}/features/distributed` },
      { title: { zh: '日志管理', en: 'Log Management' }, href: `https://docs.rustfs.com/${locale}/features/logging` },
      { title: { zh: '版本控制', en: 'Version Control' }, href: `https://docs.rustfs.com/${locale}/features/versioning` },
      { title: { zh: 'S3 兼容', en: 'S3 Compatible' }, href: `https://docs.rustfs.com/${locale}/features/s3-compatibility` },
      { title: { zh: '对象级与只读', en: 'Object-level and Read-only' }, href: `https://docs.rustfs.com/${locale}/features/worm` },
      { title: { zh: '跨区域复制', en: 'Cross-region Replication' }, href: `https://docs.rustfs.com/${locale}/features/replication` },
      { title: { zh: '加密', en: 'Encryption' }, href: `https://docs.rustfs.com/${locale}/features/encryption` },
      { title: { zh: '生命周期管理', en: 'Lifecycle Management' }, href: `https://docs.rustfs.com/${locale}/features/lifecycle` },
    ],
    'solutions': [
      { title: { zh: '现代数据湖', en: 'Modern Data Lake' }, href: `https://docs.rustfs.com/${locale}/features/data-lake` },
      { title: { zh: 'AI 和机器学习', en: 'AI and Machine Learning' }, href: `https://docs.rustfs.com/${locale}/features/ai` },
      { title: { zh: '云原生', en: 'Cloud Native' }, href: `https://docs.rustfs.com/${locale}/features/cloud-native` },
      { title: { zh: '大数据计算存储分离', en: 'Big Data Compute-Storage Separation' }, href: `https://docs.rustfs.com/${locale}/features/hdfs` },
      { title: { zh: 'SQL 支持', en: 'SQL Support' }, href: `https://docs.rustfs.com/${locale}/features/sql-server` },
      { title: { zh: '量化交易', en: 'Quantitative Trading' }, href: `https://docs.rustfs.com/${locale}/features/quantitative-trading` },
      { title: { zh: '制造业降本', en: 'Manufacturing Cost Reduction' }, href: `https://docs.rustfs.com/${locale}/features/industry` },
      { title: { zh: '冷归档存储', en: 'Cold Archive Storage' }, href: `https://docs.rustfs.com/${locale}/features/cold-archiving` },
      { title: { zh: '视频存储方案', en: 'Video Storage Solutions' }, href: `https://docs.rustfs.com/${locale}/features/video` },
      { title: { zh: '国产信创和 SM 解决方案', en: 'Domestic Innovation and SM Solutions' }, href: `https://docs.rustfs.com/${locale}/features/domestic` },
    ],
    'about-us': [
      { title: { zh: '关于我们', en: 'About Us' }, href: `https://docs.rustfs.com/${locale}/about` },
      { title: { zh: '投资和合作', en: 'Investment and Cooperation' }, href: `https://docs.rustfs.com/${locale}/about` },
      { title: { zh: '商标使用', en: 'Trademark Usage' }, href: `https://docs.rustfs.com/${locale}/trademark` },
    ],
  };

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
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
            {tw('架构支持', 'Architecture Support')}
          </h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['architecture-support']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title[locale]}
                </Link>
              </p>
            ))}
          </div>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
            {tw('产品功能', 'Product Features')}
          </h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['product-features']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title[locale]}
                </Link>
              </p>
            ))}
          </div>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
            {tw('解决方案', 'Solutions')}
          </h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['solutions']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title[locale]}
                </Link>
              </p>
            ))}
          </div>
        </div>
        {/* End Col */}

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
            {tw('关于我们', 'About Us')}
          </h4>
          <div className="mt-3 grid space-y-3 text-sm">
            {navs['about-us']?.map((item: NavItem, index: number) => (
              <p key={index}>
                <Link
                  className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href={item.href}
                >
                  {item.title[locale]}
                </Link>
              </p>
            ))}
          </div>

          <h4 className="mt-7 text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">{tw('联系我们', 'Contact Us')}</h4>
          <div className="mt-3 grid space-y-3 text-sm">
            <p className="text-gray-600 dark:text-neutral-400">hello@rustfs.com</p>
            <p className="text-gray-600 dark:text-neutral-400">400-033-5363</p>
            <p className="text-gray-600 dark:text-neutral-400">{tw('北京市海淀区西小口路66号', 'No.66, Xikou Road, Haidian District, Beijing')}</p>
            <p className="text-gray-600 dark:text-neutral-400">{tw('客服时间', 'Customer Service Time')}: 9:00-18:00</p>
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
