'use client'

import { docs_url } from "@/lib/utils";
import { useLocale, useTranslations } from 'next-intl';
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {
  const t = useTranslations();
  const locale = useLocale();

  const footerLinks = [
    {
      title: t('footer.Architecture Support'),
      links: [
        { title: t('footer.Bare Metal and Virtualization'), href: docs_url('features/baremetal', locale) },
        { title: t('footer.Alibaba Cloud'), href: docs_url('features/aliyun', locale) },
        { title: t('footer.Tencent Cloud'), href: docs_url('features/qcloud', locale) },
        { title: t('footer.Huawei Cloud'), href: docs_url('features/huaweicloud', locale) },
        { title: t('footer.International Cloud Providers'), href: docs_url('features/aws-elastic', locale) },
      ]
    },
    {
      title: t('footer.Product Features'),
      links: [
        { title: t('footer.Distributed'), href: docs_url('features/distributed', locale) },
        { title: t('footer.Log Management'), href: docs_url('features/logging', locale) },
        { title: t('footer.Version Control'), href: docs_url('features/versioning', locale) },
        { title: t('footer.S3 Compatible'), href: docs_url('features/s3-compatibility', locale) },
        { title: t('footer.Object-level and Read-only'), href: docs_url('features/worm', locale) },
        { title: t('footer.Cross-region Replication'), href: docs_url('features/replication', locale) },
        { title: t('footer.Encryption'), href: docs_url('features/encryption', locale) },
        { title: t('footer.Lifecycle Management'), href: docs_url('features/lifecycle', locale) },
      ]
    },
    {
      title: t('footer.Solutions'),
      links: [
        { title: t('footer.Modern Data Lake'), href: docs_url('features/data-lake', locale) },
        { title: t('footer.AI and Machine Learning'), href: docs_url('features/ai', locale) },
        { title: t('footer.Cloud Native'), href: docs_url('features/cloud-native', locale) },
        { title: t('footer.Big Data Compute-Storage Separation'), href: docs_url('features/hdfs', locale) },
        { title: t('footer.SQL Support'), href: docs_url('features/sql-server', locale) },
        { title: t('footer.Quantitative Trading'), href: docs_url('features/quantitative-trading', locale) },
        { title: t('footer.Manufacturing Cost Reduction'), href: docs_url('features/industry', locale) },
        { title: t('footer.Cold Archive Storage'), href: docs_url('features/cold-archiving', locale) },
        { title: t('footer.Video Storage Solutions'), href: docs_url('features/video', locale) },
        { title: t('footer.Domestic Innovation and SM Solutions'), href: docs_url('features/domestic', locale) },
      ]
    },
    {
      title: t('footer.About Us'),
      links: [
        { title: t('footer.About Us'), href: docs_url('about', locale) },
        { title: t('footer.Investment and Cooperation'), href: docs_url('about', locale) },
        { title: t('footer.Trademark Usage'), href: docs_url('trademark', locale) },
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
                      {item.title}
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
              <div className="text-sm text-muted-foreground flex flex-col gap-0.5">
                <p>{t('footer.Customer Service Hours: 9:00-18:00')}</p>
                <div className="flex items-center gap-2">
                  <span>{t('footer.Beijing Haidian District Xixiaokou Road 66')}</span>
                  <span className="hidden md:inline-block">|</span>
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('footer.beijingIcpLicense')}
                  </a>
                </div>
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
