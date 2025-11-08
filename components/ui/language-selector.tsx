'use client'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';

export default function LanguageToggle() {
  const languages = [
    { code: 'en', label: 'English', url: 'https://rustfs.com' },
    { code: 'zh', label: '中文', url: 'https://rustfs.com.cn' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">English</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <a href={lang.url} className="w-full cursor-pointer">
              {lang.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
