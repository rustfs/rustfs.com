import { locales } from '@/lib/constants';
import { getTranslations } from '@/lib/i18n-server';
import DownloadPageClient from './components/download-page-client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' });

  return {
    title: t('titles.download') + ' | ' + t('titles.home'),
    description: t('descriptions.download'),
  };
}

export default async function DownloadPage() {
  return <DownloadPageClient />;
}
