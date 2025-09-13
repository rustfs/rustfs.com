'use client'

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LocaleDocsPage() {
  const { locale } = useParams();

  useEffect(() => {
    // 根据语言版本跳转到对应的文档页面
    const docsUrl = locale === 'zh' 
      ? 'https://docs.rustfs.com/zh/' 
      : 'https://docs.rustfs.com/en/';
    
    window.location.href = docsUrl;
  }, [locale]);

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
