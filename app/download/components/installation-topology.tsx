import { NetworkIcon, ServerIcon, SquareStackIcon } from 'lucide-react';
import type { ComponentType } from 'react';

function TopologyRow({
  code,
  name,
  icon: Icon,
  useCase,
  tradeoff,
  command,
}: {
  code: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  useCase: string;
  tradeoff: string;
  command: string;
}) {
  return (
    <article className="grid border-b border-border last:border-b-0 lg:grid-cols-[13rem_1fr_1fr_15rem]">
      <div className="flex items-center gap-4 border-b border-border p-5 lg:border-b-0 lg:border-r">
        <span className="flex size-11 items-center justify-center bg-brand text-brand-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{code}</p>
          <h3 className="mt-1 text-base font-semibold text-foreground">{name}</h3>
        </div>
      </div>
      <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Best for</p>
        <p className="mt-3 text-sm leading-7 text-foreground">{useCase}</p>
      </div>
      <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Watch</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{tradeoff}</p>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Shape</p>
        <code className="mt-3 block border border-border bg-background px-3 py-2 text-xs text-foreground">{command}</code>
      </div>
    </article>
  );
}

export default function InstallationTopology() {
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
          <TopologyRow
            code="SNSD"
            name="Single-node single-disk"
            icon={ServerIcon}
            useCase="Developer laptops, demos, and disposable validation environments."
            tradeoff="No redundancy. Treat the data path as replaceable."
            command="rustfs /data"
          />
          <TopologyRow
            code="SNMD"
            name="Single-node multiple-disk"
            icon={SquareStackIcon}
            useCase="Small deployments that need local erasure coding across drives."
            tradeoff="Disk failure tolerance improves, but the node remains a single availability boundary."
            command="rustfs /disk{1...4}"
          />
          <TopologyRow
            code="MNMD"
            name="Multi-node multiple-disk"
            icon={NetworkIcon}
            useCase="Production clusters, high durability, and petabyte-scale object storage."
            tradeoff="Requires network, identity, observability, capacity, and upgrade planning."
            command="rustfs http://node{1...4}/disk{1...4}"
          />
        </div>
      </div>
    </section>
  );
}
