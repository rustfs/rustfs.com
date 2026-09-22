import type { Metadata } from "next";

// `/zh/` client-redirects to the Chinese site; declare that target as canonical
// so search engines consolidate this URL into rustfs.com.cn.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://rustfs.com.cn/",
  },
};

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
