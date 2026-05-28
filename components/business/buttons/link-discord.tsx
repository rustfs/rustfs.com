import { cn } from "@/lib/utils";
import Link from "next/link";

const DISCORD_URL = "https://discord.gg/NcKBCEJp6P";

export default function LinkDiscord({ className, size = "size-4" }: { className?: string | string[], size?: string }) {
  return (
    <Link
      className={cn("inline-block text-muted-foreground hover:text-primary", className)}
      href={DISCORD_URL}
      target="_blank"
      rel="noreferrer"
      title="Discord"
      aria-label="Join RustFS on Discord"
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={size}
        fill="currentColor"
        aria-hidden="true"
      >
        <title>Discord</title>
        <path d="M20.317 4.37A19.79 19.79 0 0 0 15.36 2.84a14.32 14.32 0 0 0-.636 1.31 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.645-1.31A19.74 19.74 0 0 0 3.633 4.37C.498 9.046-.352 13.607.073 18.105a19.9 19.9 0 0 0 6.074 3.074 14.76 14.76 0 0 0 1.3-2.11 12.9 12.9 0 0 1-2.048-.987c.172-.127.34-.258.502-.391a14.2 14.2 0 0 0 12.198 0c.164.133.331.264.502.39a12.8 12.8 0 0 1-2.052.988 14.6 14.6 0 0 0 1.3 2.11 19.87 19.87 0 0 0 6.078-3.074c.5-5.213-.852-9.733-3.61-13.735ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    </Link>
  )
}
