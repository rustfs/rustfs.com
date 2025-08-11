import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import DownloadPageClient from './components/download-page-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <DownloadPageClient />;
}
