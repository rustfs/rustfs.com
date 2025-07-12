'use client'

import { useI18n } from "@/lib/i18n"
import LinkGitHub from './buttons/link-github'
import LinkTwitter from './buttons/link-twitter'
import { Logo } from './logo'

export default function AppFooter() {
  const { tw, language } = useI18n();

  const footerLinks = [
    {
      title: tw('架构支持', 'Architecture Support'),
      links: [
        { title: { zh: '裸金属和虚拟化', en: 'Bare Metal and Virtualization' }, href: `https://docs.rustfs.com/${language}/features/baremetal` },
        { title: { zh: '阿里云', en: 'Alibaba Cloud' }, href: `https://docs.rustfs.com/${language}/features/aliyun` },
        { title: { zh: '腾讯云', en: 'Tencent Cloud' }, href: `https://docs.rustfs.com/${language}/features/qcloud` },
        { title: { zh: '华为云', en: 'Huawei Cloud' }, href: `https://docs.rustfs.com/${language}/features/huaweicloud` },
        { title: { zh: 'AWS、Azure、GCP', en: 'AWS, Azure, GCP' }, href: `https://docs.rustfs.com/${language}/features/aws-azure-gcp` },
        { title: { zh: '国际云厂商', en: 'International Cloud Providers' }, href: `https://docs.rustfs.com/${language}/features/aws-elastic` },
      ]
    },
    {
      title: tw('产品功能', 'Product Features'),
      links: [
        { title: { zh: '分布式', en: 'Distributed' }, href: `https://docs.rustfs.com/${language}/features/distributed` },
        { title: { zh: '日志管理', en: 'Log Management' }, href: `https://docs.rustfs.com/${language}/features/logging` },
        { title: { zh: '版本控制', en: 'Version Control' }, href: `https://docs.rustfs.com/${language}/features/versioning` },
        { title: { zh: 'S3 兼容', en: 'S3 Compatible' }, href: `https://docs.rustfs.com/${language}/features/s3-compatibility` },
        { title: { zh: '对象级与只读', en: 'Object-level and Read-only' }, href: `https://docs.rustfs.com/${language}/features/worm` },
        { title: { zh: '跨区域复制', en: 'Cross-region Replication' }, href: `https://docs.rustfs.com/${language}/features/replication` },
        { title: { zh: '加密', en: 'Encryption' }, href: `https://docs.rustfs.com/${language}/features/encryption` },
        { title: { zh: '生命周期管理', en: 'Lifecycle Management' }, href: `https://docs.rustfs.com/${language}/features/lifecycle` },
      ]
    },
    {
      title: tw('解决方案', 'Solutions'),
      links: [
        { title: { zh: '现代数据湖', en: 'Modern Data Lake' }, href: `https://docs.rustfs.com/${language}/features/data-lake` },
        { title: { zh: 'AI 和机器学习', en: 'AI and Machine Learning' }, href: `https://docs.rustfs.com/${language}/features/ai` },
        { title: { zh: '云原生', en: 'Cloud Native' }, href: `https://docs.rustfs.com/${language}/features/cloud-native` },
        { title: { zh: '大数据计算存储分离', en: 'Big Data Compute-Storage Separation' }, href: `https://docs.rustfs.com/${language}/features/hdfs` },
        { title: { zh: 'SQL 支持', en: 'SQL Support' }, href: `https://docs.rustfs.com/${language}/features/sql-server` },
        { title: { zh: '量化交易', en: 'Quantitative Trading' }, href: `https://docs.rustfs.com/${language}/features/quantitative-trading` },
        { title: { zh: '制造业降本', en: 'Manufacturing Cost Reduction' }, href: `https://docs.rustfs.com/${language}/features/industry` },
        { title: { zh: '冷归档存储', en: 'Cold Archive Storage' }, href: `https://docs.rustfs.com/${language}/features/cold-archiving` },
        { title: { zh: '视频存储方案', en: 'Video Storage Solutions' }, href: `https://docs.rustfs.com/${language}/features/video` },
        { title: { zh: '国产信创和 SM 解决方案', en: 'Domestic Innovation and SM Solutions' }, href: `https://docs.rustfs.com/${language}/features/domestic` },
      ]
    },
    {
      title: tw('关于我们', 'About Us'),
      links: [
        { title: { zh: '关于我们', en: 'About Us' }, href: `https://docs.rustfs.com/${language}/about` },
        { title: { zh: '投资和合作', en: 'Investment and Cooperation' }, href: `https://docs.rustfs.com/${language}/about` },
        { title: { zh: '商标使用', en: 'Trademark Usage' }, href: `https://docs.rustfs.com/${language}/trademark` },
      ]
    }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Logo className="h-8 w-auto" />
              <div className="text-sm text-muted-foreground">
                <p>{tw('客服时间：9:00-18:00', 'Customer Service Hours: 9:00-18:00')}</p>
                <p>{tw('北京市海淀区西小口路66号', 'Beijing Haidian District Xixiaokou Road 66')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LinkGitHub size="size-5" className="group inline-flex" />
              <LinkTwitter size="size-5" className="group inline-flex" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
