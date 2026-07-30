import DownloadPageClient from './components/download-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Download & Install RustFS | Multi-OS & Cloud-Native Deployment",
  description: 'Download RustFS Server and native CLI (rc). Install seamlessly on Linux, macOS, Windows, and NixOS using pre-built binaries, Docker images, or Kubernetes.',
  keywords: 'download RustFS, install RustFS, RustFS binary, RustFS Docker, RustFS Kubernetes, RustFS CLI, RustFS command line, NixOS object storage, S3 server download, macOS, Linux, Windows, nixos',
  openGraph: {
    title: "Download & Install RustFS | Multi-OS & Cloud-Native Deployment",
    description: 'Download RustFS Server and native CLI (rc). Install seamlessly on Linux, macOS, Windows, and NixOS using pre-built binaries, Docker images, or Kubernetes.',
    type: "website",
    locale: 'en_US',
  },
};

export default function DownloadPage() {
  return <DownloadPageClient />;
}
