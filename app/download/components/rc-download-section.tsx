'use client'

import { Button } from '@/components/ui/button';
import { formatVersion, type GitHubRelease } from '@/lib/github';
import {
  ArrowUpRightIcon,
  BracesIcon,
  BoxesIcon,
  DownloadIcon,
  LaptopIcon,
  TerminalIcon,
} from 'lucide-react';
import CodeBlock from './code-block';
import Note from './common/note';

interface RcDownloadSectionProps {
  cliRelease: GitHubRelease | null;
}

const releaseFallbackUrl = 'https://github.com/rustfs/cli/releases/latest';

function findAsset(
  release: GitHubRelease | null,
  patterns: RegExp[],
  fallbackName: string,
) {
  const asset = release?.assets.find((candidate) =>
    patterns.some((pattern) => pattern.test(candidate.name))
  );

  if (!asset) {
    return {
      url: release?.html_url ?? releaseFallbackUrl,
      filename: fallbackName,
      isDirect: false,
    };
  }

  return {
    url: asset.browser_download_url,
    filename: asset.name,
    isDirect: true,
  };
}

function CliPackageCard({
  title,
  description,
  arch,
  asset,
  commands,
}: {
  title: string;
  description: string;
  arch: string;
  asset: ReturnType<typeof findAsset>;
  commands: string[];
}) {
  return (
    <article className="motion-card min-w-0 border border-border bg-card">
      <div className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{arch}</p>
          <h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <Button asChild size="lg" className="h-11 shrink-0 px-4 text-sm font-semibold">
          <a href={asset.url} target="_blank" rel="noopener noreferrer">
            Download
            <DownloadIcon data-icon="inline-end" className="size-4" />
          </a>
        </Button>
      </div>
      <div className="p-5">
        {asset.isDirect ? (
          <CodeBlock code={commands} title="Install package" />
        ) : (
          <Note type="warning">
            Open the GitHub Release page and download <code>{asset.filename}</code> or the closest matching package.
          </Note>
        )}
      </div>
    </article>
  );
}

function PackageManagerCard() {
  return (
    <article className="motion-card grid min-w-0 border border-border bg-card lg:grid-cols-2 [&>*]:min-w-0">
      <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <TerminalIcon className="motion-icon-tile size-5 text-brand" />
          <h3 className="text-xl font-semibold text-foreground">Homebrew</h3>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The shortest path for macOS operators who already manage tools through Homebrew.
        </p>
        <CodeBlock code={['brew install rustfs/tap/rc', 'rc --help']} title="macOS" className="mt-5" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <LaptopIcon className="motion-icon-tile size-5 text-brand" />
          <h3 className="text-xl font-semibold text-foreground">Scoop</h3>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          A clean Windows install path that keeps the rc binary updateable from the terminal.
        </p>
        <CodeBlock
          code={[
            'scoop bucket add rustfs https://github.com/rustfs/scoop-bucket',
            'scoop install rustfs/rc',
            'rc --help',
          ]}
          title="Windows"
          className="mt-5"
        />
      </div>
    </article>
  );
}

function DockerAndSourceCard() {
  return (
    <article className="motion-card grid min-w-0 border border-border bg-card lg:grid-cols-2 [&>*]:min-w-0">
      <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <BoxesIcon className="motion-icon-tile size-5 text-brand" />
          <h3 className="text-xl font-semibold text-foreground">Run rc in Docker</h3>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Useful for CI jobs, air-gapped image review, or one-off admin commands without touching the host.
        </p>
        <CodeBlock
          code={[
            'docker pull rustfs/cli:latest',
            'docker run --rm rustfs/cli:latest rc --help',
          ]}
          title="Container CLI"
          className="mt-5"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <BracesIcon className="motion-icon-tile size-5 text-brand" />
          <h3 className="text-xl font-semibold text-foreground">Build from source</h3>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Pick this route when you need to inspect code, patch locally, or test unreleased rc behavior.
        </p>
        <CodeBlock
          code={[
            'git clone https://github.com/rustfs/cli.git',
            'cd cli',
            'cargo build --release',
            './target/release/rc --help',
          ]}
          title="Cargo build"
          className="mt-5"
        />
      </div>
    </article>
  );
}

export default function RcDownloadSection({ cliRelease }: RcDownloadSectionProps) {
  const version = cliRelease ? formatVersion(cliRelease.tag_name) : 'latest';
  const releaseUrl = cliRelease?.html_url ?? releaseFallbackUrl;
  const linuxX86 = findAsset(
    cliRelease,
    [/rustfs-cli-linux-(amd64|x86_64).*\.tar\.gz/i],
    'rustfs-cli-linux-amd64-latest.tar.gz',
  );
  const linuxArm = findAsset(
    cliRelease,
    [/rustfs-cli-linux-(arm64|aarch64).*\.tar\.gz/i],
    'rustfs-cli-linux-arm64-latest.tar.gz',
  );
  const macIntel = findAsset(
    cliRelease,
    [/rustfs-cli-macos-(amd64|x86_64).*\.tar\.gz/i],
    'rustfs-cli-macos-amd64-latest.tar.gz',
  );
  const macArm = findAsset(
    cliRelease,
    [/rustfs-cli-macos-(arm64|aarch64).*\.tar\.gz/i],
    'rustfs-cli-macos-arm64-latest.tar.gz',
  );
  const windows = findAsset(
    cliRelease,
    [/rustfs-cli-windows-(amd64|x86_64).*\.(zip|tar\.gz)/i],
    'rustfs-cli-windows-amd64-latest.zip',
  );

  return (
    <section id="rc" className="border-y border-border bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Admin CLI</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
              rc is the operator surface after RustFS is running.
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Use rc for bucket, object, cluster, identity, and operational workflows. Install it where you operate RustFS, not necessarily where the server runs.
            </p>
            <Button asChild variant="outline" size="lg" className="h-11 px-4 text-sm font-semibold">
              <a href={releaseUrl} target="_blank" rel="noopener noreferrer">
                rc {version}
                <ArrowUpRightIcon data-icon="inline-end" className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <PackageManagerCard />

          <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
            <CliPackageCard
              title="Linux x86_64"
              description="Use this on common AMD64 Linux servers, CI runners, and admin hosts."
              arch="amd64"
              asset={linuxX86}
              commands={[
                `wget ${linuxX86.url}`,
                `tar -zxvf ${linuxX86.filename}`,
                'chmod +x rc',
                'sudo install -m 755 rc /usr/local/bin/rc',
              ]}
            />
            <CliPackageCard
              title="Linux ARM64"
              description="Use this for ARM servers, edge nodes, and Apple Silicon Linux environments."
              arch="arm64"
              asset={linuxArm}
              commands={[
                `wget ${linuxArm.url}`,
                `tar -zxvf ${linuxArm.filename}`,
                'chmod +x rc',
                'sudo install -m 755 rc /usr/local/bin/rc',
              ]}
            />
            <CliPackageCard
              title="macOS Intel"
              description="A direct package for Intel-based macOS workstations and jump hosts."
              arch="amd64"
              asset={macIntel}
              commands={[
                `curl -L -O ${macIntel.url}`,
                `tar -zxvf ${macIntel.filename}`,
                'chmod +x rc',
                'sudo install -m 755 rc /usr/local/bin/rc',
              ]}
            />
            <CliPackageCard
              title="macOS Apple Silicon"
              description="A native package for M-series Macs used as operator workstations."
              arch="arm64"
              asset={macArm}
              commands={[
                `curl -L -O ${macArm.url}`,
                `tar -zxvf ${macArm.filename}`,
                'chmod +x rc',
                'sudo install -m 755 rc /usr/local/bin/rc',
              ]}
            />
          </div>

          <CliPackageCard
            title="Windows x86_64"
            description="Use this for Windows-based admin machines, lab environments, and compatibility checks."
            arch="amd64"
            asset={windows}
            commands={[
              `curl -L -O ${windows.url}`,
              `Expand-Archive ${windows.filename}`,
              'rc.exe --help',
            ]}
          />

          <DockerAndSourceCard />

          <Note type="info">
            For older or pinned rc versions, use the GitHub Release page and choose the matching package for your operating system.
          </Note>
        </div>
      </div>
    </section>
  );
}
