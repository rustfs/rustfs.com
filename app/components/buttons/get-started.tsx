import { ArrowRightIcon } from "lucide-react";

export default function GetStartedButton() {
  return (
    <a href="https://docs.rustfs.com" className="group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-secondary-foreground/90 active:bg-secondary/80 active:text-secondary-foreground/80 focus-visible:outline-secondary transition-colors">
      <span className="mr-2">快速开始</span>
      <ArrowRightIcon className="h-3 w-3 flex-none" />
    </a>
  )
}
