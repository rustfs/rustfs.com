'use client'

import { docs_url } from "@/lib/utils";
import { useTranslations } from '@/lib/i18n';
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {
  const { t, locale } = useTranslations('footer');

  const footerLinks = [
    {
      title: t('architectureSupport'),
      links: [
        { title: t('bareMetalAndVirtualization'), href: docs_url('features/baremetal', locale) },
        { title: t('alibabaCloud'), href: docs_url('features/aliyun', locale) },
        { title: t('tencentCloud'), href: docs_url('features/qcloud', locale) },
        { title: t('huaweiCloud'), href: docs_url('features/huaweicloud', locale) },
        { title: t('internationalCloudProviders'), href: docs_url('features/aws-elastic', locale) },
      ]
    },
    {
      title: t('productFeatures'),
      links: [
        { title: t('distributed'), href: docs_url('features/distributed', locale) },
        { title: t('logManagement'), href: docs_url('features/logging', locale) },
        { title: t('versionControl'), href: docs_url('features/versioning', locale) },
        { title: t('s3Compatible'), href: docs_url('features/s3-compatibility', locale) },
        { title: t('objectLevelAndReadOnly'), href: docs_url('features/worm', locale) },
        { title: t('crossRegionReplication'), href: docs_url('features/replication', locale) },
        { title: t('encryption'), href: docs_url('features/encryption', locale) },
        { title: t('lifecycleManagement'), href: docs_url('features/lifecycle', locale) },
      ]
    },
    {
      title: t('solutions'),
      links: [
        { title: t('modernDataLake'), href: docs_url('features/data-lake', locale) },
        { title: t('aiAndMachineLearning'), href: docs_url('features/ai', locale) },
        { title: t('cloudNative'), href: docs_url('features/cloud-native', locale) },
        { title: t('bigDataComputeStorageSeparation'), href: docs_url('features/hdfs', locale) },
        { title: t('sqlSupport'), href: docs_url('features/sql-server', locale) },
        { title: t('quantitativeTrading'), href: docs_url('features/quantitative-trading', locale) },
        { title: t('manufacturingCostReduction'), href: docs_url('features/industry', locale) },
        { title: t('coldArchiveStorage'), href: docs_url('features/cold-archiving', locale) },
        { title: t('videoStorageSolutions'), href: docs_url('features/video', locale) },
        { title: t('domesticInnovationAndSMSolutions'), href: docs_url('features/domestic', locale) },
      ]
    },
    {
      title: t('aboutUs'),
      links: [
        { title: t('aboutUs'), href: docs_url('about', locale) },
        { title: t('investmentAndCooperation'), href: docs_url('about', locale) },
        { title: t('trademarkUsage'), href: docs_url('trademark', locale) },
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
                <p>{t('customerServiceHours')}</p>
                <div className="flex items-center gap-2">
                  <span>{t('beijingAddress')}</span>
                  <span className="hidden md:inline-block">|</span>
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('beijingIcpLicense')}
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
