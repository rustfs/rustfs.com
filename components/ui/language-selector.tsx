'use client'
import { SITE_CONFIG } from '@/app.config';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 gap-2"
      onClick={() => {
        window.location.href = SITE_CONFIG.secondaryDomain;
      }}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">English</span>
    </Button>
  );
}
