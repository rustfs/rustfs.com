'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.replace(pathWithoutLocale, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((l) => (
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
