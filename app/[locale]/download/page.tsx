import { locales } from '@/lib/constants';
import DownloadPageClient from './components/download-page-client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DownloadPage() {
  return <DownloadPageClient />;
}
