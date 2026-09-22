import type { Metadata } from "next";

// `/en/` client-redirects to the homepage; declare the homepage as canonical
// so search engines consolidate this duplicate URL into it.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
