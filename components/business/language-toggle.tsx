'use client'

import { Button } from '@/components/ui/button';
import { locales } from '@/i18n';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // 获取当前路径（去掉语言前缀）
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    // 导航到新语言
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <Button
          key={l}
          variant={locale === l ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange(l)}
          className="h-8 w-8 p-0"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{l === 'zh' ? '中文' : 'English'}</span>
        </Button>
      ))}
    </div>
  );
}
