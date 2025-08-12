'use client'

import { useTranslations } from '@/lib/i18n';
import { docs_url } from "@/lib/utils";
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {
  const { t, locale } = useTranslations('footer');

  const footerLinks = [
    {
      title: t('Architecture Support'),
      links: [
        { title: t('Bare Metal & Virtualization'), href: docs_url('features/baremetal', locale) },
        { title: t('Alibaba Cloud'), href: docs_url('features/aliyun', locale) },
        { title: t('Tencent Cloud'), href: docs_url('features/qcloud', locale) },
        { title: t('Huawei Cloud'), href: docs_url('features/huaweicloud', locale) },
        { title: t('International Cloud Providers'), href: docs_url('features/aws-elastic', locale) },
      ]
    },
    {
      title: t('Product Features'),
      links: [
        { title: t('Distributed Storage'), href: docs_url('features/distributed', locale) },
        { title: t('Log Management'), href: docs_url('features/logging', locale) },
        { title: t('Version Control'), href: docs_url('features/versioning', locale) },
        { title: t('S3 Compatible'), href: docs_url('features/s3-compatibility', locale) },
        { title: t('Object Level Read-Only'), href: docs_url('features/worm', locale) },
        { title: t('Cross-Region Replication'), href: docs_url('features/replication', locale) },
        { title: t('Encryption'), href: docs_url('features/encryption', locale) },
        { title: t('Lifecycle Management'), href: docs_url('features/lifecycle', locale) },
      ]
    },
    {
      title: t('Solutions'),
      links: [
        { title: t('Modern Data Lake'), href: docs_url('features/data-lake', locale) },
        { title: t('AI & Machine Learning'), href: docs_url('features/ai', locale) },
        { title: t('Cloud Native'), href: docs_url('features/cloud-native', locale) },
        { title: t('Big Data Compute-Storage Separation'), href: docs_url('features/hdfs', locale) },
        { title: t('SQL Support'), href: docs_url('features/sql-server', locale) },
        { title: t('Quantitative Trading'), href: docs_url('features/quantitative-trading', locale) },
        { title: t('Manufacturing Cost Reduction'), href: docs_url('features/industry', locale) },
        { title: t('Cold Archive Storage'), href: docs_url('features/cold-archiving', locale) },
        { title: t('Video Storage Solutions'), href: docs_url('features/video', locale) },
        { title: t('Domestic Innovation & SM Solutions'), href: docs_url('features/domestic', locale) },
      ]
    },
    {
      title: t('About Us'),
      links: [
        { title: t('About Us'), href: docs_url('about', locale) },
        { title: t('Investment & Cooperation'), href: docs_url('about', locale) },
        { title: t('Trademark Usage'), href: docs_url('about', locale) },
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
                <p>{t('Customer Service: Weekdays 9:00-18:00')}</p>
                <div className="flex items-center gap-2">
                  <span>{t('Beijing Address: Chaoyang District, Beijing')}</span>
                  <span className="hidden md:inline-block">|</span>
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('Beijing ICP License: XXXXXXXXXXXX')}
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
