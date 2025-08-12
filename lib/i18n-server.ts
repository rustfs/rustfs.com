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

// 服务端翻译函数（用于 SSR）
export function t(key: string): string {
  // 服务端需要同步获取消息，这里保持原有逻辑
  // 在实际使用中，服务端组件应该通过 getMessages 获取
  return key
}

export function getLocale(request: Request): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage?.includes('en')) return 'en'
  return 'zh'
}
