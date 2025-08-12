import AppFooter from '@/components/business/app-footer';
import AppHeader from '@/components/business/app-header';
import FixedContactButton from '@/components/business/buttons/fixed-contact-button';
import { locales, type Locale } from '@/lib/constants';
import { I18nProvider } from '@/lib/i18n';
import { getMessages } from '@/lib/i18n-server';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 动态加载语言包
  const messages = await getMessages(locale as Locale);

  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale as Locale} messages={messages}>
          <AppHeader />
          {children}
          <AppFooter />
          <FixedContactButton />
        </I18nProvider>
      </body>
    </html>
  );
}
