import { type Locale, defaultLocale } from './constants';

export type Messages = Record<string, unknown>

// 获取嵌套对象的值 - 共享函数
export function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
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

// 翻译函数 - 共享逻辑
export function translate(
  messages: Messages,
  key: string,
  namespace?: string,
  values?: Record<string, string | number>
): string {
  let message: string | undefined;

  if (namespace) {
    // 先尝试在命名空间下查找
    const namespaceMessages = messages[namespace] as Record<string, unknown>;
    if (namespaceMessages && typeof namespaceMessages === 'object') {
      // 直接在命名空间对象中查找键
      message = namespaceMessages[key] as string;
    }

    // 如果命名空间下没找到，尝试全局查找
    if (!message) {
      message = messages[key] as string;
    }
  } else {
    // 直接全局查找
    message = messages[key] as string;
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
}

// 服务端加载语言包 - 共享逻辑
export async function loadMessages(locale: Locale): Promise<Messages> {
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

// 客户端动态加载语言包
export async function getMessagesClient(locale: Locale): Promise<Messages> {
  try {
    // 动态导入对应语言的 JSON 文件
    const response = await fetch(`/api/i18n/${locale}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch messages for locale: ${locale}`)
    }
    return await response.json()
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}`, error)
    // 如果加载失败，尝试加载默认语言包
    if (locale !== defaultLocale) {
      try {
        const response = await fetch(`/api/i18n/${defaultLocale}`)
        if (response.ok) {
          return await response.json()
        }
      } catch (fallbackError) {
        console.warn(`Failed to load fallback messages for locale: ${defaultLocale}`, fallbackError)
      }
    }
    // 如果默认语言也失败，返回空对象
    return {}
  }
}
