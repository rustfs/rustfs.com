import DownloadPageClient from './components/download-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download | RustFS - High-Performance Distributed Storage System Built with Rust',
  description: 'Download RustFS, supporting Docker, Linux, macOS, Windows and other platforms, quickly deploy your distributed storage system.',
  openGraph: {
    title: 'Download | RustFS - High-Performance Distributed Storage System Built with Rust',
    description: 'Download RustFS, supporting Docker, Linux, macOS, Windows and other platforms, quickly deploy your distributed storage system.',
    type: "website",
    locale: 'en_US',
  },
};

export default async function DownloadPage() {
  return <DownloadPageClient />;
}
