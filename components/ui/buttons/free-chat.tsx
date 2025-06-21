import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function FreeChatButton({ className }: {
  className?: string | string[]
}) {
  return (
    <a
      className={cn("group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900", className)}
      target="_blank"
      href="https://tb.53kf.com/code/client/3ae82624ac86c32c1db8d311cd6d2a659/2"
    >
      <span className="mr-2">立即免费咨询</span>
      <ArrowRightIcon className="h-3 w-3 flex-none" />
    </a>
  )
}
