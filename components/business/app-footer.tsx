'use client'

import { SITE_CONFIG } from '@/app.config';
import { docs_url } from "@/lib/utils";
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {
  const footerLinks = [
    {
      title: 'Architecture Support',
      links: [
        { title: 'Bare Metal & Virtualization', href: docs_url('features/baremetal') },
        { title: 'AWS', href: docs_url('features/aws-elastic') },
        { title: 'Cloud Native', href: docs_url('features/cloud-native') },
      ]
    },
    {
      title: 'Product Features',
      links: [
        { title: 'Distributed Storage', href: docs_url('features/distributed') },
        { title: 'Log Management', href: docs_url('features/logging') },
        { title: 'Version Control', href: docs_url('features/versioning') },
        { title: 'S3 Compatible', href: docs_url('features/s3-compatibility') },
        { title: 'Object Level Read-Only', href: docs_url('features/worm') },
        { title: 'Cross-Region Replication', href: docs_url('features/replication') },
        { title: 'Encryption', href: docs_url('features/encryption') },
        { title: 'Lifecycle Management', href: docs_url('features/lifecycle') },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { title: 'Modern Data Lake', href: docs_url('features/data-lake') },
        { title: 'AI & Machine Learning', href: docs_url('features/ai') },
        { title: 'Cloud Native', href: docs_url('features/cloud-native') },
        { title: 'Big Data Compute-Storage Separation', href: docs_url('features/hdfs') },
        { title: 'SQL Support', href: docs_url('features/sql-server') },
        { title: 'Quantitative Trading', href: docs_url('features/quantitative-trading') },
        { title: 'Manufacturing Cost Reduction', href: docs_url('features/industry') },
        { title: 'Cold Archive Storage', href: docs_url('features/cold-archiving') },
        { title: 'Video Storage Solutions', href: docs_url('features/video') },
        { title: 'Compliance-focused Architecture', href: docs_url('features/domestic') },
      ]
    },
    {
      title: 'About Us',
      links: [
        { title: 'About Us', href: docs_url('about') },
        { title: 'Investment & Cooperation', href: docs_url('about') },
        { title: 'Trademark Usage', href: docs_url('about') },
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
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Logo className="h-8 w-auto" />
              <div className="text-sm text-muted-foreground flex flex-col gap-2">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <a
                    href="mailto:hello@rustfs.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email: hello@rustfs.com
                  </a>
                  <span className="hidden md:inline">|</span>
                  <a href="tel:+14707850446">Phone: +1(470)785-0446 </a>
                </div>
                <div className="flex items-center gap-2 text-center md:text-left">
                  <span>3550 Lenox Road, NE Atlanta, Georgia 30326</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.secondaryDomain}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                简体中文
              </a>
              <LinkTwitter size="size-4" className="group inline-flex" />
              <LinkGitHub className="group inline-flex" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
