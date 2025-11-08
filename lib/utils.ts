import { SITE_CONFIG } from "@/app.config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function docs_url(path: string) {
  // 处理空路径或无效路径
  if (!path || typeof path !== 'string') {
    path = '/'
  }

  // 移除路径开头和结尾的多余空格
  path = path.trim()

  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${SITE_CONFIG.docsDomain}${normalizedPath}`
}
