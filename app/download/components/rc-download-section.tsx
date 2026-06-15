'use client'

import { formatVersion, type GitHubRelease } from "@/lib/github";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import CodeBlock from "./code-block";
import Note from "./common/note";

interface RcDownloadSectionProps {
  release: GitHubRelease | null;
}

interface CliPackage {
  title: string;
  arch: string;
  fallbackName: string;
  patterns: RegExp[];
  commands: (url: string, filename: string) => string[];
}

const releaseFallbackUrl = "https://github.com/rustfs/cli/releases/latest";

const packages: CliPackage[] = [
  {
    title: "Linux x86_64",
    arch: "amd64",
    fallbackName: "rustfs-cli-linux-amd64-latest.tar.gz",
    patterns: [/rustfs-cli-linux-(amd64|x86_64).*\.tar\.gz/i],
    commands: (url, filename) => [
      `wget ${url}`,
      `tar -zxvf ${filename}`,
      "chmod +x rc",
      "cp rc /usr/local/bin",
    ],
  },
  {
    title: "Linux ARM64",
    arch: "arm64",
    fallbackName: "rustfs-cli-linux-arm64-latest.tar.gz",
    patterns: [/rustfs-cli-linux-(arm64|aarch64).*\.tar\.gz/i],
    commands: (url, filename) => [
      `wget ${url}`,
      `tar -zxvf ${filename}`,
      "chmod +x rc",
      "cp rc /usr/local/bin",
    ],
  },
  {
    title: "macOS Intel",
    arch: "amd64",
    fallbackName: "rustfs-cli-macos-amd64-latest.tar.gz",
    patterns: [/rustfs-cli-macos-(amd64|x86_64).*\.tar\.gz/i],
    commands: (url, filename) => [
      `wget ${url}`,
      `tar -zxvf ${filename}`,
      "chmod +x rc",
      "cp rc /usr/local/bin",
    ],
  },
  {
    title: "macOS Apple Silicon",
    arch: "arm64",
    fallbackName: "rustfs-cli-macos-arm64-latest.tar.gz",
    patterns: [/rustfs-cli-macos-(arm64|aarch64).*\.tar\.gz/i],
    commands: (url, filename) => [
      `wget ${url}`,
      `tar -zxvf ${filename}`,
      "chmod +x rc",
      "cp rc /usr/local/bin",
    ],
  },
  {
    title: "Windows x86_64",
    arch: "amd64",
    fallbackName: "rustfs-cli-windows-amd64-latest.zip",
    patterns: [/rustfs-cli-windows-(amd64|x86_64).*\.(zip|tar\.gz)/i],
    commands: (url, filename) => [
      `curl -L -O ${url}`,
      `Expand-Archive ${filename}`,
      "rc.exe --help",
    ],
  },
];

function findAsset(release: GitHubRelease | null, item: CliPackage) {
  const asset = release?.assets.find((candidate) =>
    item.patterns.some((pattern) => pattern.test(candidate.name))
  );

  if (!asset) {
    return {
      url: releaseFallbackUrl,
      filename: item.fallbackName,
      isDirect: false,
    };
  }

  return {
    url: asset.browser_download_url,
    filename: asset.name,
    isDirect: true,
  };
}

export default function RcDownloadSection({ release }: RcDownloadSectionProps) {
  const version = release ? formatVersion(release.tag_name) : "latest";

  return (
    <section id="rc" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground">rc CLI</h2>
          <p className="mt-4 text-muted-foreground">
            Download the native RustFS CLI for object, bucket, cluster, and security operations.
          </p>
          <a
            href={release?.html_url || releaseFallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            <span>Current version: {version}</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Homebrew</h3>
            <CodeBlock code={["brew install rustfs/tap/rc"]} title="macOS Homebrew" className="mt-4" />
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Scoop</h3>
            <CodeBlock
              code={[
                "scoop bucket add rustfs https://github.com/rustfs/scoop-bucket",
                "scoop install rustfs/rc",
              ]}
              title="Windows Scoop"
              className="mt-4"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {packages.map((item) => {
            const asset = findAsset(release, item);

            return (
              <article key={item.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Architecture: {item.arch}</p>
                  </div>
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <DownloadIcon className="size-4" />
                    <span>Download</span>
                  </a>
                </div>
                {asset.isDirect ? (
                  <CodeBlock code={item.commands(asset.url, asset.filename)} title="Installation Commands" className="mt-4" />
                ) : (
                  <Note type="warning" className="mt-4">
                    {'Open the GitHub Release page and download the matching package for this platform.'}
                  </Note>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Docker</h3>
            <CodeBlock
              code={[
                "docker pull rustfs/cli:latest",
                "docker run --rm rustfs/cli:latest rc --help",
              ]}
              title="Docker Commands"
              className="mt-4"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Source</h3>
            <CodeBlock
              code={[
                "git clone https://github.com/rustfs/cli.git",
                "cd cli",
                "cargo build --release",
              ]}
              title="Build from Source"
              className="mt-4"
            />
          </div>
        </div>

        <Note type="info" className="mt-6">
          {'To download older or specific versions, check all available releases on GitHub.'}
        </Note>
      </div>
    </section>
  );
}
