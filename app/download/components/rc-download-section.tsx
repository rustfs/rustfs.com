'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatVersion, type GitHubRelease } from '@/lib/github';
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BracesIcon,
  BoxesIcon,
  LaptopIcon,
  TerminalIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState, type ComponentType, type KeyboardEvent } from 'react';
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
}: {
  title: string;
  description: string;
  arch: string;
  asset: ReturnType<typeof findAsset>;
}) {
  return (
    <a
      href={asset.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} package: ${asset.filename}`}
      title={asset.filename}
      className="motion-card group flex min-h-44 min-w-0 flex-col border-t border-border py-5 transition-colors hover:border-foreground/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{arch}</p>
        <ArrowUpRightIcon className="motion-arrow size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-auto pt-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          {asset.isDirect ? 'Download package' : 'GitHub releases'}
        </span>
      </div>
    </a>
  );
}

function PackageManagerCard() {
  return (
    <article className="grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 [&>*]:min-w-0">
      <div className="border-b border-border pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
        <div className="flex items-center gap-3">
          <TerminalIcon className="motion-icon-tile size-5 text-brand" />
          <h3 className="text-xl font-semibold text-foreground">Homebrew</h3>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The shortest path for macOS operators who already manage tools through Homebrew.
        </p>
        <CodeBlock code={['brew install rustfs/tap/rc', 'rc --help']} title="macOS" className="mt-5" />
      </div>
      <div className="pt-0">
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

function DockerInstallCard() {
  return (
    <article className="min-w-0 p-6 sm:p-8">
      <div className="max-w-3xl">
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
    </article>
  );
}

function SourceInstallCard() {
  return (
    <article className="min-w-0 p-6 sm:p-8">
      <div className="max-w-3xl">
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

type CliInstallMethod = {
  id: 'package-managers' | 'binaries' | 'docker' | 'source';
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

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
  const methods: CliInstallMethod[] = [
    { id: 'package-managers', label: 'Package managers', Icon: TerminalIcon },
    { id: 'binaries', label: 'Direct binaries', Icon: LaptopIcon },
    { id: 'docker', label: 'Docker', Icon: BoxesIcon },
    { id: 'source', label: 'Source', Icon: BracesIcon },
  ];
  const [activeMethodId, setActiveMethodId] = useState<CliInstallMethod['id']>(methods[0].id);
  const activeMethod = methods.find((method) => method.id === activeMethodId) ?? methods[0];

  const handleMethodKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % methods.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + methods.length) % methods.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = methods.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveMethodId(methods[nextIndex].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section id="rc" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            All downloads
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Admin CLI</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
                RustFS CLI (rc)
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
                rc is the operator surface after RustFS is running.
              </p>
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

          <div className="mt-12 overflow-hidden border-y border-border">
            <div className="overflow-x-auto border-b border-border bg-background/40">
              <div className="flex min-w-max" role="tablist" aria-label="CLI install methods">
                {methods.map((method, index) => {
                  const Icon = method.Icon;
                  const isActive = method.id === activeMethod.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      role="tab"
                      id={`cli-method-tab-${method.id}`}
                      aria-selected={isActive}
                      aria-controls={`cli-method-${method.id}`}
                      onClick={() => setActiveMethodId(method.id)}
                      onKeyDown={(event) => handleMethodKeyDown(event, index)}
                      tabIndex={isActive ? 0 : -1}
                      className={cn(
                        'flex min-h-14 items-center gap-2 border-b-2 border-b-transparent px-5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground',
                        isActive && 'border-b-brand bg-brand/10 text-brand',
                      )}
                    >
                      <Icon className="size-4" />
                      {method.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              id={`cli-method-${activeMethod.id}`}
              role="tabpanel"
              aria-labelledby={`cli-method-tab-${activeMethod.id}`}
              className="min-w-0"
            >
              {activeMethod.id === 'package-managers' ? <PackageManagerCard /> : null}

              {activeMethod.id === 'binaries' ? (
                <div className="p-6 sm:p-8">
                  <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
                    <CliPackageCard
                      title="Linux x86_64"
                      description="Use this on common AMD64 Linux servers, CI runners, and admin hosts."
                      arch="amd64"
                      asset={linuxX86}
                    />
                    <CliPackageCard
                      title="Linux ARM64"
                      description="Use this for ARM servers, edge nodes, and Apple Silicon Linux environments."
                      arch="arm64"
                      asset={linuxArm}
                    />
                    <CliPackageCard
                      title="macOS Intel"
                      description="A direct package for Intel-based macOS workstations and jump hosts."
                      arch="amd64"
                      asset={macIntel}
                    />
                    <CliPackageCard
                      title="macOS Apple Silicon"
                      description="A native package for M-series Macs used as operator workstations."
                      arch="arm64"
                      asset={macArm}
                    />
                    <CliPackageCard
                      title="Windows x86_64"
                      description="Use this for Windows-based admin machines, lab environments, and compatibility checks."
                      arch="amd64"
                      asset={windows}
                    />
                  </div>
                  <div className="mt-8">
                    <Note type="info">
                      For older or pinned rc versions, use the GitHub Release page and choose the matching package for your operating system.
                    </Note>
                  </div>
                </div>
              ) : null}

              {activeMethod.id === 'docker' ? <DockerInstallCard /> : null}
              {activeMethod.id === 'source' ? <SourceInstallCard /> : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
