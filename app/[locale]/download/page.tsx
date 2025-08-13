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
  };
}

export default async function DownloadPage() {
  return <DownloadPageClient />;
}
