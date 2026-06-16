'use client'

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string[];
  title?: string;
  className?: string;
}

export default function CodeBlock({ code, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn("min-w-0 overflow-hidden border border-border bg-background", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-muted/35 px-4 py-3">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</h4>
          <button
            onClick={copyToClipboard}
            className="motion-button inline-flex size-8 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Copy code"
          >
            {copied ? (
              <CheckIcon className="size-4 text-success" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </button>
        </div>
      )}

      <div className="relative">
        <pre className="max-w-full overflow-hidden bg-card p-4 font-mono text-[13px] leading-7 text-foreground sm:overflow-x-auto">
          {code.map((line, index) => (
            <div key={index} className="grid grid-cols-[1.4rem_minmax(0,1fr)] gap-2">
              <span className="select-none text-muted-foreground">$</span>
              <span className="min-w-0 whitespace-pre-wrap break-words sm:whitespace-pre">
                {line}
              </span>
            </div>
          ))}
        </pre>

        {!title && (
          <button
            onClick={copyToClipboard}
            className="motion-button absolute right-2 top-2 inline-flex size-8 items-center justify-center border border-border bg-background/90 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Copy code"
          >
            {copied ? (
              <CheckIcon className="size-4 text-success" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
