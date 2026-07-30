import RcDownloadSection from '../components/rc-download-section';
import { getLatestCliRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download RustFS CLI (rc) | Multi-Platform Install',
  description: 'Install the RustFS rc command-line client with a package manager, native binary, Docker, or source build.',
};

export default async function DownloadCliPage() {
  const cliRelease = await getLatestCliRelease();

  return <RcDownloadSection cliRelease={cliRelease} />;
}
