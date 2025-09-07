import { locales } from '@/lib/constants';
import { getTranslations } from '@/lib/i18n-server';
import DownloadPageClient from './components/download-page-client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    title: t('title_download') + ' | ' + t('title_home'),
    description: t('description_download'),
    openGraph: {
      title: t('title_download') + ' | ' + t('title_home'),
      description: t('description_download'),
      type: "website",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
    },
  };
}

export default async function DownloadPage() {
  return <DownloadPageClient />;
}
