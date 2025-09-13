'use client'

import { useEffect } from 'react';

export default function DocsPage() {
  useEffect(() => {
    // 重定向到 docs.rustfs.com
    window.location.href = 'https://docs.rustfs.com';
  }, []);

  // 显示加载状态
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to documentation...</p>
      </div>
    </div>
  );
}
