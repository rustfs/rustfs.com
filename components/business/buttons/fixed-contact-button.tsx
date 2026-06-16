import { MessageCircleIcon } from "lucide-react"

export default function FixedContactButton() {
  return (
    <div className="fixed bottom-10 right-10 z-50 hidden items-end justify-end md:flex">
      <a href="https://rustfs.com/contact/" className="motion-button relative right-0 inline-flex size-12 items-center justify-center gap-2 bg-brand text-brand-foreground hover:bg-brand/90" target="_blank" aria-label="Contact us">
        <MessageCircleIcon className="size-5" />
      </a>
    </div>
  )
}
