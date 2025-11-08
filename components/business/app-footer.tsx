'use client'

import { docs_url } from "@/lib/utils";
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {const footerLinks = [
    {
      title: 'Architecture Support',
      links: [
        { title: 'Bare Metal & Virtualization', href: docs_url('features/baremetal', locale) },
        { title: 'Alibaba Cloud', href: docs_url('features/aliyun', locale) },
        { title: 'Tencent Cloud', href: docs_url('features/qcloud', locale) },
        { title: 'Huawei Cloud', href: docs_url('features/huaweicloud', locale) },
        { title: 'International Cloud Providers', href: docs_url('features/aws-elastic', locale) },
      ]
    },
    {
      title: 'Product Features',
      links: [
        { title: 'Distributed Storage', href: docs_url('features/distributed', locale) },
        { title: 'Log Management', href: docs_url('features/logging', locale) },
        { title: 'Version Control', href: docs_url('features/versioning', locale) },
        { title: 'S3 Compatible', href: docs_url('features/s3-compatibility', locale) },
        { title: 'Object Level Read-Only', href: docs_url('features/worm', locale) },
        { title: 'Cross-Region Replication', href: docs_url('features/replication', locale) },
        { title: 'Encryption', href: docs_url('features/encryption', locale) },
        { title: 'Lifecycle Management', href: docs_url('features/lifecycle', locale) },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { title: 'Modern Data Lake', href: docs_url('features/data-lake', locale) },
        { title: 'AI & Machine Learning', href: docs_url('features/ai', locale) },
        { title: 'Cloud Native', href: docs_url('features/cloud-native', locale) },
        { title: 'Big Data Compute-Storage Separation', href: docs_url('features/hdfs', locale) },
        { title: 'SQL Support', href: docs_url('features/sql-server', locale) },
        { title: 'Quantitative Trading', href: docs_url('features/quantitative-trading', locale) },
        { title: 'Manufacturing Cost Reduction', href: docs_url('features/industry', locale) },
        { title: 'Cold Archive Storage', href: docs_url('features/cold-archiving', locale) },
        { title: 'Video Storage Solutions', href: docs_url('features/video', locale) },
        { title: 'Domestic Innovation & SM Solutions', href: docs_url('features/domestic', locale) },
      ]
    },
    {
      title: 'About Us',
      links: [
        { title: 'About Us', href: docs_url('about', locale) },
        { title: 'Investment & Cooperation', href: docs_url('about', locale) },
        { title: 'Trademark Usage', href: docs_url('about', locale) },
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
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:hello@rustfs.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {'Email: hello@rustfs.com'}
                  </a>
                  <span className="hidden md:inline-block">|</span>
                  <a
                    href="tel:400-033-5363"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {'  '}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>{'3550 Lenox Road, NE Atlanta, Georgia 30326'}</span>
                  {locale === 'zh' && (
                    <>
                      <span className="hidden md:inline-block">|</span>
                      <a
                        href="https://beian.miit.gov.cn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {'Beijing ICP License: XXXXXXXXXXXX'}
                      </a>
                    </>
                  )}
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
