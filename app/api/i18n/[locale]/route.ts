import { locales, type Locale } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params

    // 验证语言参数
    if (!locales.includes(locale as Locale)) {
      return NextResponse.json(
        { error: `Unsupported locale: ${locale}` },
        { status: 400 }
      )
    }

    // 动态导入对应语言的 JSON 文件
    const messages = await import(`@/locales/${locale}.json`)

    // 设置缓存头，允许浏览器缓存语言包
    const response = NextResponse.json(messages.default || messages)
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    response.headers.set('Content-Type', 'application/json; charset=utf-8')

    return response
  } catch (error) {
    console.error(`Failed to load messages for locale: ${params}`, error)
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    )
  }
}
