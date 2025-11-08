'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface MacOSDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function MacOSDownloadSection({ platform, className }: MacOSDownloadSectionProps) {return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Homebrew Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{'Homebrew Installation'}</h3>

        <CodeBlock
          code={["brew tap rustfs/homebrew-tap", "brew install rustfs", "rustfs --version"]}
          title={'Homebrew Commands'}
        />

        <Note type="info">
          <Link href="https://brew.sh/" target="_blank" className="hover:underline">
            {'Homebrew is required for installation'}
          </Link>
        </Note>
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Binary Downloads'}</h3>

        {/* Apple Silicon Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'Apple Silicon'}</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: aarch64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-aarch64-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl --progress-bar -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-aarch64-latest.zip",
              "unzip rustfs-macos-aarch64-latest.zip",
              "chmod +x rustfs",
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <div className="space-y-2">
            <Note type="tip">
              {'Default credentials: rustfsadmin / rustfsadmin'}
            </Note>
            <Note type="tip">
              {'Apple Silicon optimized for better performance'}
            </Note>
          </div>
        </div>

        {/* Intel Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'Intel'}</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: x86_64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-x86_64-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl --progress-bar -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-macos-x86_64-latest.zip",
              "unzip rustfs-macos-x86_64-latest.zip",
              "chmod +x rustfs",
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <Note type="tip">
            {'Default credentials: rustfsadmin / rustfsadmin'}
          </Note>
        </div>
      </div>
    </div>
  );
}
