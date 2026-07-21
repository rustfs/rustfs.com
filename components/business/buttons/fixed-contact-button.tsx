import { MailIcon } from "lucide-react"

export default function FixedContactButton() {
  return (
    <div className="fixed bottom-10 right-10 z-50 hidden items-end justify-end 2xl:flex">
      <a href="/contact-us" className="motion-button relative right-0 inline-flex size-12 items-center justify-center gap-2 bg-brand text-brand-foreground hover:bg-brand/90" aria-label="Contact RustFS">
        <MailIcon className="size-5" />
      </a>
    </div>
  )
}
