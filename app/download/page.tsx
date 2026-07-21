import DownloadPageClient from './components/download-page-client';
import { getLatestRelease, getLatestCliRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Download & Install RustFS | Multi-OS & Cloud-Native Deployment",
  description: 'Download the RustFS public beta server and native CLI (rc) for evaluation on Linux, macOS, Windows, Docker, or Kubernetes.',
  keywords: 'download RustFS, install RustFS, RustFS binary, RustFS Docker, RustFS Kubernetes, RustFS CLI, RustFS command line, NixOS object storage, S3 server download, macOS, Linux, Windows, nixos',
  openGraph: {
    title: "Download & Install RustFS | Multi-OS & Cloud-Native Deployment",
    description: 'Download the RustFS public beta server and native CLI (rc) for evaluation on Linux, macOS, Windows, Docker, or Kubernetes.',
    type: "website",
    locale: 'en_US',
  },
};

export default async function DownloadPage() {
  const [release, cliRelease] = await Promise.all([
    getLatestRelease(),
    getLatestCliRelease()
  ]);
  return <DownloadPageClient release={release} cliRelease={cliRelease} />;
}
