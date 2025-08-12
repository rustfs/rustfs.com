'use client'

import { useTranslations } from '@/lib/i18n'
import { type PlatformInfoData } from '../platforms/platform-info'

interface PlatformHeaderProps {
  platform: PlatformInfoData
  className?: string
  iconClassName?: string
}

export default function PlatformHeader({ platform, className }: PlatformHeaderProps) {
  const { t, locale } = useTranslations('download')

  return (
    <div className={`text-center space-y-4 ${className || ''}`}>
      <div className="flex items-center justify-center mb-4">
        <div className="w-20 h-20 flex items-center justify-center text-4xl">
          {platform.icon}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground">
        {t('Download for')} {platform.name}
      </h2>

      <p className="text-muted-foreground max-w-2xl mx-auto">
        {platform.description[locale as 'zh' | 'en']}
      </p>
    </div>
  )
}
