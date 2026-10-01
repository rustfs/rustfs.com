'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatVersion, type GitHubRelease } from '@/lib/github';
import DockerIcon from '@/public/svgs/brands/docker.svg';
import LinuxIcon from '@/public/svgs/brands/linux.svg';
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BracesIcon,
  DownloadIcon,
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
const cliPackageRegexes = {
  debAmd64: [/(rustfs-cli|rc).*(amd64|x86_64).*\.deb$/i, /(amd64|x86_64).*\.deb$/i],
  debArm64: [/(rustfs-cli|rc).*(arm64|aarch64).*\.deb$/i, /(arm64|aarch64).*\.deb$/i],
  rpmX86: [/(rustfs-cli|rc).*(x86_64|amd64).*\.rpm$/i, /(x86_64|amd64).*\.rpm$/i],
  rpmArm64: [/(rustfs-cli|rc).*(aarch64|arm64).*\.rpm$/i, /(aarch64|arm64).*\.rpm$/i],
};

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

type DownloadAsset = ReturnType<typeof findAsset>;

function CliPackageCard({
  title,
  arch,
  asset,
}: {
  title: string;
  arch: string;
  asset: DownloadAsset;
}) {
  return (
    <a
      href={asset.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} package: ${asset.filename}`}
      title={asset.filename}
      className="motion-card group flex min-h-24 min-w-0 items-center justify-between gap-4 border border-border bg-card p-5 transition-colors hover:border-foreground/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{arch}</p>
        <h3 className="mt-2 truncate text-base font-semibold text-foreground">{title}</h3>
      </div>
      {asset.isDirect ? (
        <DownloadIcon className="motion-arrow size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      ) : (
        <ArrowUpRightIcon className="motion-arrow size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      )}
    </a>
  );
}

function InstallCommandCard({
  title,
  summary,
  code,
}: {
  title: string;
  summary: string;
  code: string[];
}) {
  return (
    <div className="border border-border bg-background/50 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{summary}</p>
      <CodeBlock code={code} title={title} className="mt-5" />
    </div>
  );
}

function MacOSInstallCard() {
  return (
    <article className="min-w-0 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <TerminalIcon className="motion-icon-tile size-5 text-brand" />
        <h3 className="text-xl font-semibold text-foreground">Homebrew</h3>
      </div>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        The shortest path for macOS operators who already manage tools through Homebrew.
      </p>
      <CodeBlock code={['brew install rustfs/tap/rc', 'rc --help']} title="macOS" className="mt-5" />
    </article>
  );
}

function WindowsInstallCard() {
  return (
    <article className="min-w-0 p-6 sm:p-8">
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
    </article>
  );
}

function DockerInstallCard() {
  return (
    <article className="min-w-0 p-6 sm:p-8">
      <div>
        <div className="flex items-center gap-3">
          <DockerIcon className="motion-icon-tile size-5 text-brand" />
          <h3 className="text-xl font-semibold text-foreground">Run rc in Docker</h3>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Useful for CI jobs, air-gapped image review, or one-off admin commands without touching the host.
        </p>
        <CodeBlock
          code={[
            'docker pull rustfs/rc:latest',
            'docker run --rm rustfs/rc:latest rc --help',
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
      <div>
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
  id: 'macos' | 'windows' | 'linux' | 'docker' | 'source';
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

type LinuxInstallMethod = {
  id: 'binary' | 'rpm' | 'deb';
  label: string;
};

function getNextTabIndex(
  event: KeyboardEvent<HTMLButtonElement>,
  total: number,
  currentIndex: number,
) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    return (currentIndex + 1) % total;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    return (currentIndex - 1 + total) % total;
  }

  if (event.key === 'Home') {
    return 0;
  }

  if (event.key === 'End') {
    return total - 1;
  }

  return null;
}

function LinuxBinarySection({
  linuxX86,
  linuxArm,
  rpmX86,
  rpmArm64,
  debAmd64,
  debArm64,
}: {
  linuxX86: DownloadAsset;
  linuxArm: DownloadAsset;
  rpmX86: DownloadAsset;
  rpmArm64: DownloadAsset;
  debAmd64: DownloadAsset;
  debArm64: DownloadAsset;
}) {
  const methods: LinuxInstallMethod[] = [
    { id: 'binary', label: 'Binary' },
    { id: 'rpm', label: 'RPM' },
    { id: 'deb', label: 'DEB' },
  ];
  const [activeMethodId, setActiveMethodId] = useState<LinuxInstallMethod['id']>(methods[0].id);
  const activeMethod = methods.find((method) => method.id === activeMethodId) ?? methods[0];

  const handleMethodKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(event, methods.length, index);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    setActiveMethodId(methods[nextIndex].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="overflow-x-auto border border-border bg-background/40">
        <div className="flex min-w-max" role="tablist" aria-label="Linux install methods">
          {methods.map((method, index) => {
            const isActive = method.id === activeMethod.id;

            return (
              <button
                key={method.id}
                type="button"
                role="tab"
                id={`cli-linux-method-tab-${method.id}`}
                aria-selected={isActive}
                aria-controls={`cli-linux-method-${method.id}`}
                onClick={() => setActiveMethodId(method.id)}
                onKeyDown={(event) => handleMethodKeyDown(event, index)}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  'flex min-h-12 items-center border-b-2 border-b-transparent px-5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground',
                  isActive && 'border-b-brand bg-brand/10 text-brand',
                )}
              >
                {method.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`cli-linux-method-${activeMethod.id}`}
        role="tabpanel"
        aria-labelledby={`cli-linux-method-tab-${activeMethod.id}`}
        className="mt-6 min-w-0"
      >
        {activeMethod.id === 'binary' ? (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
              <CliPackageCard title="Linux x86_64" arch="amd64 tar.gz" asset={linuxX86} />
              <CliPackageCard title="Linux ARM64" arch="arm64 tar.gz" asset={linuxArm} />
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
              <InstallCommandCard
                title="Binary x86_64"
                summary="Download the Linux tarball, extract it, and place rc on your PATH."
                code={[
                  `curl -O ${linuxX86.url}`,
                  `tar -xzf ${linuxX86.filename}`,
                  'sudo install -m 0755 rc /usr/local/bin/rc',
                  'rc --help',
                ]}
              />
              <InstallCommandCard
                title="Binary ARM64"
                summary="Use the ARM64 tarball when your Linux host runs on Graviton or other aarch64 hardware."
                code={[
                  `curl -O ${linuxArm.url}`,
                  `tar -xzf ${linuxArm.filename}`,
                  'sudo install -m 0755 rc /usr/local/bin/rc',
                  'rc --help',
                ]}
              />
            </div>
          </div>
        ) : null}

        {activeMethod.id === 'rpm' ? (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
              <CliPackageCard title="RPM x86_64" arch="x86_64 rpm" asset={rpmX86} />
              <CliPackageCard title="RPM aarch64" arch="aarch64 rpm" asset={rpmArm64} />
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
              <InstallCommandCard
                title="RPM x86_64"
                summary="Install rc with rpm on RHEL, Rocky, AlmaLinux, Fedora, or compatible distributions."
                code={[
                  `curl -O ${rpmX86.url}`,
                  `sudo rpm -ivh ${rpmX86.filename}`,
                  'rc --help',
                ]}
              />
              <InstallCommandCard
                title="RPM aarch64"
                summary="Use the aarch64 rpm when your Linux system uses 64-bit ARM package repositories."
                code={[
                  `curl -O ${rpmArm64.url}`,
                  `sudo rpm -ivh ${rpmArm64.filename}`,
                  'rc --help',
                ]}
              />
            </div>
          </div>
        ) : null}

        {activeMethod.id === 'deb' ? (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
              <CliPackageCard title="DEB amd64" arch="amd64 deb" asset={debAmd64} />
              <CliPackageCard title="DEB arm64" arch="arm64 deb" asset={debArm64} />
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
              <InstallCommandCard
                title="DEB amd64"
                summary="Install rc with dpkg on Debian, Ubuntu, and other deb-based distributions."
                code={[
                  `curl -O ${debAmd64.url}`,
                  `sudo dpkg -i ${debAmd64.filename}`,
                  'rc --help',
                ]}
              />
              <InstallCommandCard
                title="DEB arm64"
                summary="Choose the ARM64 deb package for Ubuntu or Debian systems on 64-bit ARM machines."
                code={[
                  `curl -O ${debArm64.url}`,
                  `sudo dpkg -i ${debArm64.filename}`,
                  'rc --help',
                ]}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          <Note type="info">
            For older or pinned rc versions, use the GitHub Release page and choose the matching Linux package for your architecture.
          </Note>
        </div>
      </div>
    </div>
  );
}

export default function RcDownloadSection({ cliRelease }: RcDownloadSectionProps) {
  const version = cliRelease ? formatVersion(cliRelease.tag_name) : 'latest';
  const releaseUrl = cliRelease?.html_url ?? releaseFallbackUrl;
  const packageVersion = cliRelease?.tag_name.replace(/^v/, '') ?? 'latest';
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
  const debAmd64 = findAsset(
    cliRelease,
    cliPackageRegexes.debAmd64,
    `rustfs-cli_${packageVersion}_amd64.deb`,
  );
  const debArm64 = findAsset(
    cliRelease,
    cliPackageRegexes.debArm64,
    `rustfs-cli_${packageVersion}_arm64.deb`,
  );
  const rpmX86 = findAsset(
    cliRelease,
    cliPackageRegexes.rpmX86,
    `rustfs-cli-${packageVersion}-1.x86_64.rpm`,
  );
  const rpmArm64 = findAsset(
    cliRelease,
    cliPackageRegexes.rpmArm64,
    `rustfs-cli-${packageVersion}-1.aarch64.rpm`,
  );
  const methods: CliInstallMethod[] = [
    { id: 'linux', label: 'Linux', Icon: LinuxIcon },
    { id: 'docker', label: 'Docker', Icon: DockerIcon },
    { id: 'macos', label: 'macOS', Icon: TerminalIcon },
    { id: 'windows', label: 'Windows', Icon: LaptopIcon },
    { id: 'source', label: 'Source', Icon: BracesIcon },
  ];
  const [activeMethodId, setActiveMethodId] = useState<CliInstallMethod['id']>(methods[0].id);
  const activeMethod = methods.find((method) => method.id === activeMethodId) ?? methods[0];

  const handleMethodKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(event, methods.length, index);

    if (nextIndex === null) {
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

          <div className="mt-10">
            <h1 className="w-full font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              RustFS CLI Client (rc)
            </h1>
            <p className="mt-4 w-full text-lg font-semibold leading-8 text-foreground sm:text-xl">
              rc is the operator surface after RustFS is running.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" size="lg" className="h-11 px-4 text-sm font-semibold">
                <a href={releaseUrl} target="_blank" rel="noopener noreferrer">
                  rc {version}
                  <ArrowUpRightIcon data-icon="inline-end" className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-12 overflow-hidden border border-border bg-card">
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
              {activeMethod.id === 'macos' ? <MacOSInstallCard /> : null}
              {activeMethod.id === 'windows' ? <WindowsInstallCard /> : null}
              {activeMethod.id === 'linux' ? (
                <LinuxBinarySection
                  linuxX86={linuxX86}
                  linuxArm={linuxArm}
                  rpmX86={rpmX86}
                  rpmArm64={rpmArm64}
                  debAmd64={debAmd64}
                  debArm64={debArm64}
                />
              ) : null}

              {activeMethod.id === 'docker' ? <DockerInstallCard /> : null}
              {activeMethod.id === 'source' ? <SourceInstallCard /> : null}
            </div>
          </div>

          <aside className="mt-8 border border-border bg-muted/30 p-5 sm:p-6" aria-labelledby="cli-install-notes">
            <h2 id="cli-install-notes" className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Notes
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>
                For step-by-step instructions, see the{' '}
                <a
                  href="https://docs.rustfs.com/en/operations/rc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:text-foreground"
                >
                  Installation Documentation
                </a>
                .
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
