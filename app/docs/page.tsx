'use client'

import { useEffect } from 'react';
import { RedirectPanel } from '@/components/business/redirect-panel';

export default function DocsPage() {
  useEffect(() => {
    window.location.replace('https://docs.rustfs.com');
  }, []);

  return (
    <RedirectPanel
      actionLabel="Open docs"
      description="You are being redirected to the RustFS documentation site."
      eyebrow="Documentation"
      href="https://docs.rustfs.com"
      label="Redirect"
      title="Opening RustFS Docs."
    />
  );
}
