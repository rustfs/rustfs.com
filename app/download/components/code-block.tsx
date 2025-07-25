'use client'

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string[];
  title?: string;
  className?: string;
}

export default function CodeBlock({ code, title, className }: CodeBlockProps) {
  const { tw } = useI18n();
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
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      {title && (
        <div className="px-4 py-2 bg-muted/50 border-b border-border">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
        </div>
      )}

      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground bg-card">
          {code.map((line, index) => (
            <div key={index} className="mb-1 last:mb-0">
              <span className="text-muted-foreground select-none">$ </span>
              <span>{line}</span>
            </div>
          ))}
        </pre>

        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title={tw('复制代码', 'Copy code', 'Kodu kopyala')}
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
