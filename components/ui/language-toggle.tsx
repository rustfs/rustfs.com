'use client'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { locales } from '@/lib/constants';
import { useTranslations } from '@/lib/i18n';
import { ChevronDown, Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { locale, setLocale } = useTranslations();

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as 'zh' | 'en');
  };

  const getLanguageLabel = (l: string) => {
    return l === 'zh' ? '中文' : 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getLanguageLabel(locale)}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleLanguageChange(l)}
            className={locale === l ? 'bg-accent' : ''}
          >
            {getLanguageLabel(l)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
