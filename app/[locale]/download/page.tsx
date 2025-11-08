import { locales } from '@/lib/constants';
import DownloadPageClient from './components/download-page-client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;return {
    title: 'Download' + ' | ' + 'RustFS - High-Performance Distributed Storage System Built with Rust',
    description: 'Download RustFS, supporting Docker, Linux, macOS, Windows and other platforms, quickly deploy your distributed storage system.',
    openGraph: {
      title: 'Download' + ' | ' + 'RustFS - High-Performance Distributed Storage System Built with Rust',
      description: 'Download RustFS, supporting Docker, Linux, macOS, Windows and other platforms, quickly deploy your distributed storage system.',
      type: "website",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
    },
  };
}

export default async function DownloadPage() {
  return <DownloadPageClient />;
}
