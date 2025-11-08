'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface LinuxDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function LinuxDownloadSection({ platform, className }: LinuxDownloadSectionProps) {return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* One-click Installation Script */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{'One-click Installation Script'}</h3>
        <CodeBlock
          code={["curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh"]}
          title={'One-click Installation Script'}
        />
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'Binary Downloads'}</h3>

        {/* x86_64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">x86_64</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: x86_64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip",
              "unzip rustfs-linux-x86_64-musl-latest.zip",
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <Note type="tip">
            {'Default credentials: rustfsadmin / rustfsadmin'}
          </Note>
        </div>

        {/* aarch64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">aarch64</h4>
              <p className="text-sm text-muted-foreground">
                {'Architecture'}: aarch64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'Download'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip",
              "unzip rustfs-linux-aarch64-musl-latest.zip",
              "./rustfs --version",
            ]}
            title={'Installation Commands'}
          />

          <div className="space-y-2">
            <Note type="info">
              {'ARM64 optimized for better performance'}
            </Note>
            <Note type="tip">
              {'Default credentials: rustfsadmin / rustfsadmin'}
            </Note>
          </div>
        </div>
      </div>
    </div>
  );
}
