'use client'
import { Button } from '@/components/ui/button';
import { locales } from '@/lib/constants';
import { useTranslations } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { locale, setLocale } = useTranslations();

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as 'zh' | 'en');
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
