import { ServerDownloadPage } from '../components/download-page-client';
import { getLatestRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download RustFS Server | Linux, Docker & Kubernetes',
  description: 'Install the RustFS server with a Linux binary, Docker, Compose, Kubernetes, macOS, or Windows.',
};

export default async function DownloadServerPage() {
  const release = await getLatestRelease();

  return <ServerDownloadPage release={release} />;
}
