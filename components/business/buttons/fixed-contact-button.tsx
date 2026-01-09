import { MessageCircleIcon } from "lucide-react"

export default function FixedContactButton() {
  return (
    <div className="fixed bottom-10 right-10 z-50 flex items-end justify-end">
      <a href="https://rustfs.com/contact/" className="relative right-0 inline-flex items-center justify-center gap-2 rounded-full h-12 w-12 bg-blue-600 hover:bg-blue-500 text-white" target="_blank">
        <MessageCircleIcon />
      </a>
    </div>
  )
}
