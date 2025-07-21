import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function docs_url(path: string, language: string = 'en') {
  // 处理空路径或无效路径
  if (!path || typeof path !== 'string') {
    path = '/';
  }

  // 移除路径开头和结尾的多余空格
  path = path.trim();

  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // 处理语言参数，确保只有有效值
  const validLanguages = ['zh', 'en'];
  const normalizedLanguage = validLanguages.includes(language) ? language : 'en';

  // 根据语言返回对应的文档链接
  const baseUrl = 'https://docs.rustfs.com';
  return normalizedLanguage === 'zh' ? `${baseUrl}/zh${normalizedPath}` : `${baseUrl}${normalizedPath}`;
}
