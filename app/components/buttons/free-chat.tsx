import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function FreeChatButton({ className }: {
  className?: string | string[]
}) {
  return (
    <a
      className={cn("group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 active:bg-primary/80 active:text-primary-foreground/80 focus-visible:outline-primary", className)}
      target="_blank"
      href="https://tb.53kf.com/code/client/3ae82624ac86c32c1db8d311cd6d2a659/2"
    >
      <span className="mr-2">立即免费咨询</span>
      <ArrowRightIcon className="h-3 w-3 flex-none" />
    </a>
  )
}
