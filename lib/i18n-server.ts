import { type Locale, defaultLocale } from './constants'

export type Messages = Record<string, unknown>

// 服务端加载语言包
export async function getMessages(locale: Locale): Promise<Messages> {
  try {
    // 动态导入对应语言的 JSON 文件
    const messages = await import(`@/locales/${locale}.json`)
    return messages.default || messages
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}`, error)
    // 如果加载失败，尝试加载默认语言包
    if (locale !== defaultLocale) {
      try {
        const messages = await import(`@/locales/${defaultLocale}.json`)
        return messages.default || messages
      } catch (fallbackError) {
        console.warn(`Failed to load fallback messages for locale: ${defaultLocale}`, fallbackError)
      }
    }
    // 如果默认语言也失败，返回空对象
    return {}
  }
}

// 获取嵌套对象的值
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

// 服务端翻译函数 - 参考 next-intl 的 getTranslations
export async function getTranslations({ locale, namespace }: { locale: string; namespace?: string }) {
  const messages = await getMessages(locale as Locale);

  const t = (key: string, values?: Record<string, string | number>): string => {
    let message: string | undefined;

    if (namespace) {
      // 先尝试在命名空间下查找
      const namespaceMessages = messages[namespace] as Record<string, unknown>;
      if (namespaceMessages) {
        message = getNestedValue(namespaceMessages, key);
      }

      // 如果命名空间下没找到，尝试全局查找
      if (!message) {
        message = getNestedValue(messages, key);
      }
    } else {
      // 直接全局查找
      message = getNestedValue(messages, key);
    }

    // 如果没找到，返回 key
    if (!message) {
      return key;
    }

    // 简单的插值支持（类似 next-intl 的 ICU message syntax）
    if (values) {
      return message.replace(/\{(\w+)\}/g, (match, key) => {
        return values[key]?.toString() || match;
      });
    }

    return message;
  };

  return t;
}

export function getLocale(request: Request): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage?.includes('en')) return 'en'
  return 'zh'
}
