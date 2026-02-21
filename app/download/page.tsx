import DownloadPageClient from './components/download-page-client';
import { getLatestRelease, getLatestLauncherRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Download | RustFS | Escape MinIO's AGPL. The True Open-Source Object Storage.",
  description: 'Download RustFS, supporting Docker, Linux, macOS, Windows and other platforms, quickly deploy your distributed storage system.',
  openGraph: {
    title: "Download | RustFS | Escape MinIO's AGPL. The True Open-Source Object Storage.",
    description: 'Download RustFS, supporting Docker, Linux, macOS, Windows and other platforms, quickly deploy your distributed storage system.',
    type: "website",
    locale: 'en_US',
  },
};

export default async function DownloadPage() {
  const [release, launcherRelease] = await Promise.all([
    getLatestRelease(),
    getLatestLauncherRelease()
  ]);
  return <DownloadPageClient release={release} launcherRelease={launcherRelease} />;
}
