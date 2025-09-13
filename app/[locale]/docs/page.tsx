import { locales } from '@/lib/constants';
import DocsPageClient from './components/docs-page-client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleDocsPage() {
  return <DocsPageClient />;
}
