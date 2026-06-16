'use client'

import { NetworkIcon, ServerIcon, SquareStackIcon } from 'lucide-react';
import { useState, type ComponentType } from 'react';

type Topology = {
  id: string;
  code: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  useCase: string;
  tradeoff: string;
  command: string[];
  notes: string[];
};

const topologies: Topology[] = [
  {
    id: 'single-disk',
    code: 'SNSD',
    name: 'Single-node single-disk',
    icon: ServerIcon,
    useCase: 'Personal labs, local development, and non-production testing with minimal resource use.',
    tradeoff: 'No data redundancy. Keep this path for disposable validation, not durable production data.',
    command: ['rustfs /data'],
    notes: ['1 node', '1 disk path', 'No redundancy'],
  },
  {
    id: 'single-node-multi-disk',
    code: 'SNMD',
    name: 'Single-node multiple-disk',
    icon: SquareStackIcon,
    useCase: 'Small organizations managing tens of terabytes that need local erasure coding across drives.',
    tradeoff: 'Disk failure tolerance improves, but service availability still depends on one node.',
    command: ['rustfs /disk{1...4}'],
    notes: ['1 node', 'Multiple disks', 'Local EC'],
  },
  {
    id: 'multi-node-multi-disk',
    code: 'MNMD',
    name: 'Multi-node multiple-disk',
    icon: NetworkIcon,
    useCase: 'Medium and large enterprises scaling from hundreds of terabytes to petabyte-scale object storage.',
    tradeoff: 'Requires network, identity, observability, capacity, upgrade planning, and full production operations.',
    command: ['rustfs http://node{1...4}/disk{1...4}'],
    notes: ['Multiple nodes', 'Multiple disks', 'Production'],
  },
];

function TopologyDiagram({ id }: { id: string }) {
  if (id === 'single-disk') {
    return (
      <div className="flex min-h-44 items-center justify-center p-6" aria-hidden="true">
        <div className="grid w-full max-w-72 gap-5">
          <div className="mx-auto flex h-16 w-28 items-center justify-center border border-border bg-card">
            <ServerIcon className="size-6 text-brand" />
          </div>
          <div className="mx-auto h-8 w-px bg-foreground/25" />
          <div className="mx-auto h-12 w-32 border border-border bg-muted/50" />
        </div>
      </div>
    );
  }

  if (id === 'single-node-multi-disk') {
    return (
      <div className="flex min-h-44 items-center justify-center p-6" aria-hidden="true">
        <div className="grid w-full max-w-80 gap-5">
          <div className="mx-auto flex h-16 w-32 items-center justify-center border border-border bg-card">
            <ServerIcon className="size-6 text-brand" />
          </div>
          <div className="mx-auto h-8 w-px bg-foreground/25" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((disk) => (
              <div key={disk} className="h-12 border border-border bg-muted/50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-44 items-center justify-center p-5" aria-hidden="true">
      <div className="grid w-full max-w-96 grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((node) => (
          <div key={node} className="border border-border bg-card p-2">
            <div className="mb-2 flex h-10 items-center justify-center border border-border bg-muted/35">
              <ServerIcon className="size-4 text-brand" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map((disk) => (
                <div key={disk} className="h-6 border border-border bg-background" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InstallationTopology() {
  const [activeId, setActiveId] = useState(topologies[0].id);
  const activeTopology = topologies.find((item) => item.id === activeId) ?? topologies[0];
  const ActiveIcon = activeTopology.icon;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border pt-8">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Deployment topology</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
                Pick topology after you know the failure domain.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
              RustFS can start on one machine, but production planning should be explicit about disks, nodes, and recovery expectations.
            </p>
          </div>
        </div>

        <div className="border border-border bg-card">
          <div
            role="tablist"
            aria-label="Deployment topology"
            className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {topologies.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeTopology.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`topology-panel-${item.id}`}
                  id={`topology-tab-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={[
                    'motion-button flex min-h-24 items-center gap-4 p-5 text-left transition-colors',
                    isActive ? 'bg-muted/40 text-foreground' : 'text-muted-foreground hover:bg-muted/20 hover:text-foreground',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex size-11 shrink-0 items-center justify-center',
                      isActive ? 'bg-brand text-brand-foreground' : 'bg-background text-foreground',
                    ].join(' ')}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{item.code}</span>
                    <span className="mt-1 block text-base font-semibold leading-snug">{item.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`topology-panel-${activeTopology.id}`}
            role="tabpanel"
            aria-labelledby={`topology-tab-${activeTopology.id}`}
            className="grid border-t border-border lg:grid-cols-[0.86fr_1.14fr]"
          >
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center bg-brand text-brand-foreground">
                  <ActiveIcon className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{activeTopology.code}</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-foreground">{activeTopology.name}</h3>
                </div>
              </div>

              <div className="mt-8 border border-border bg-background">
                <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="px-3 py-3">Topology shape</span>
                  <span className="border-l border-border px-3 py-3 text-brand">{activeTopology.code}</span>
                </div>
                <TopologyDiagram id={activeTopology.id} />
                <div className="grid border-t border-border text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-3">
                  {activeTopology.notes.map((note) => (
                    <span key={note} className="border-b border-border px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid">
              <div className="grid border-b border-border md:grid-cols-2">
                <div className="border-b border-border p-6 md:border-b-0 md:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Best for</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">{activeTopology.useCase}</p>
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Watch</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeTopology.tradeoff}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Shape</p>
                <code className="mt-4 block min-w-0 whitespace-pre-wrap break-words border border-border bg-background p-4 font-mono text-sm leading-6 text-foreground">
                  {activeTopology.command.join('\n')}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
