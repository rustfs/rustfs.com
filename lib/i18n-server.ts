import { type Locale } from './constants';
import { loadMessages, translate, type Messages } from './i18n-utils';

// 服务端加载语言包
export async function getMessages(locale: Locale): Promise<Messages> {
  return loadMessages(locale)
}

// 服务端翻译函数 - 参考 next-intl 的 getTranslations
export async function getTranslations({ locale, namespace }: { locale: string; namespace?: string }) {
  const messages = await getMessages(locale as Locale);

  const t = (key: string, values?: Record<string, string | number>): string => {
    return translate(messages, key, namespace, values);
  };

  return t;
}

export function getLocale(request: Request): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage?.includes('en')) return 'en'
  return 'zh'
}
