'use client'

import { useI18n } from "@/lib/i18n"
import { docs_url } from "@/lib/utils"
import LinkGitHub from './buttons/link-github'
import LinkTwitter from './buttons/link-twitter'
import { Logo } from './logo'

export default function AppFooter() {
  const { tw, language } = useI18n();

  const footerLinks = [
    {
      title: tw('架构支持', 'Architecture Support', 'Mimari Destek'),
      links: [
        { title: { zh: '裸金属和虚拟化', en: 'Bare Metal and Virtualization', tr: 'Bare Metal ve Sanallaştırma' }, href: docs_url('features/baremetal', language) },
        { title: { zh: '阿里云', en: 'Alibaba Cloud', tr: 'Alibaba Cloud' }, href: docs_url('features/aliyun', language) },
        { title: { zh: '腾讯云', en: 'Tencent Cloud', tr: 'Tencent Cloud' }, href: docs_url('features/qcloud', language) },
        { title: { zh: '华为云', en: 'Huawei Cloud', tr: 'Huawei Cloud' }, href: docs_url('features/huaweicloud', language) },
        { title: { zh: '国际云厂商', en: 'International Cloud Providers', tr: 'Uluslararası Bulut Sağlayıcıları' }, href: docs_url('features/aws-elastic', language) },
      ]
    },
    {
      title: tw('产品功能', 'Product Features', 'Ürün Özellikleri'),
      links: [
        { title: { zh: '分布式', en: 'Distributed', tr: 'Dağıtık' }, href: docs_url('features/distributed', language) },
        { title: { zh: '日志管理', en: 'Log Management', tr: 'Log Yönetimi' }, href: docs_url('features/logging', language) },
        { title: { zh: '版本控制', en: 'Version Control', tr: 'Sürüm Kontrolü' }, href: docs_url('features/versioning', language) },
        { title: { zh: 'S3 兼容', en: 'S3 Compatible', tr: 'S3 Uyumlu' }, href: docs_url('features/s3-compatibility', language) },
        { title: { zh: '对象级与只读', en: 'Object-level and Read-only', tr: 'Nesne Düzeyinde ve Salt Okunur' }, href: docs_url('features/worm', language) },
        { title: { zh: '跨区域复制', en: 'Cross-region Replication', tr: 'Bölgeler Arası Çoğaltma' }, href: docs_url('features/replication', language) },
        { title: { zh: '加密', en: 'Encryption', tr: 'Şifreleme' }, href: docs_url('features/encryption', language) },
        { title: { zh: '生命周期管理', en: 'Lifecycle Management', tr: 'Yaşam Döngüsü Yönetimi' }, href: docs_url('features/lifecycle', language) },
      ]
    },
    {
      title: tw('解决方案', 'Solutions', 'Çözümler'),
      links: [
        { title: { zh: '现代数据湖', en: 'Modern Data Lake', tr: 'Modern Veri Gölü' }, href: docs_url('features/data-lake', language) },
        { title: { zh: 'AI 和机器学习', en: 'AI and Machine Learning', tr: 'AI ve Makine Öğrenmesi' }, href: docs_url('features/ai', language) },
        { title: { zh: '云原生', en: 'Cloud Native', tr: 'Bulut Yerli' }, href: docs_url('features/cloud-native', language) },
        { title: { zh: '大数据计算存储分离', en: 'Big Data Compute-Storage Separation', tr: 'Büyük Veri İşlem-Depolama Ayrımı' }, href: docs_url('features/hdfs', language) },
        { title: { zh: 'SQL 支持', en: 'SQL Support', tr: 'SQL Desteği' }, href: docs_url('features/sql-server', language) },
        { title: { zh: '量化交易', en: 'Quantitative Trading', tr: 'Nicel Ticaret' }, href: docs_url('features/quantitative-trading', language) },
        { title: { zh: '制造业降本', en: 'Manufacturing Cost Reduction', tr: 'İmalat Maliyet Azaltma' }, href: docs_url('features/industry', language) },
        { title: { zh: '冷归档存储', en: 'Cold Archive Storage', tr: 'Soğuk Arşiv Depolama' }, href: docs_url('features/cold-archiving', language) },
        { title: { zh: '视频存储方案', en: 'Video Storage Solutions', tr: 'Video Depolama Çözümleri' }, href: docs_url('features/video', language) },
        { title: { zh: '国产信创和 SM 解决方案', en: 'Domestic Innovation and SM Solutions', tr: 'Yerli İnovasyon ve SM Çözümleri' }, href: docs_url('features/domestic', language) },
      ]
    },
    {
      title: tw('关于我们', 'About Us', 'Hakkımızda'),
      links: [
        { title: { zh: '关于我们', en: 'About Us', tr: 'Hakkımızda' }, href: docs_url('about', language) },
        { title: { zh: '投资和合作', en: 'Investment and Cooperation', tr: 'Yatırım ve İşbirliği' }, href: docs_url('about', language) },
        { title: { zh: '商标使用', en: 'Trademark Usage', tr: 'Marka Kullanımı' }, href: docs_url('trademark', language) },
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
                <p>{tw('客服时间：9:00-18:00', 'Customer Service Hours: 9:00-18:00', 'Müşteri Hizmetleri Saatleri: 9:00-18:00')}</p>
                <p>{tw('北京市海淀区西小口路66号', 'Beijing Haidian District Xixiaokou Road 66', 'Pekin Haidian Bölgesi Xixiaokou Yolu 66')}</p>
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
