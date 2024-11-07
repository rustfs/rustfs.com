import { DocsFooter } from '@components/docs-footer'

export function BasicLayout({ children }) {
  return (
    <>
      <main className="relative z-20 mx-auto max-w-3xl pt-10 xl:max-w-none">{children}</main>
      <DocsFooter />
    </>
  )
}
