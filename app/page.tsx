'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 检测用户的语言偏好
    const getPreferredLocale = () => {
      // 首先检查 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      const localeParam = urlParams.get('locale');
      if (localeParam && ['zh', 'en'].includes(localeParam)) {
        return localeParam;
      }

      // 然后检查 localStorage
      const storedLocale = localStorage.getItem('preferred-locale');
      if (storedLocale && ['zh', 'en'].includes(storedLocale)) {
        return storedLocale;
      }

      // 最后检查浏览器语言偏好
      const browserLang = navigator.language || navigator.languages?.[0] || '';
      if (browserLang.startsWith('en')) {
        return 'en';
      }

      // 默认返回中文
      return 'zh';
    };

    const locale = getPreferredLocale();
    router.replace(`/${locale}`);
  }, [router]);

  // 显示加载状态
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
