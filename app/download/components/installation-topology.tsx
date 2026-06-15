const topologies = [
  {
    title: "SNSD",
    subtitle: "Single-Node Single-Disk",
    bestFor: "Personal labs, local development, and non-production testing.",
    overview: "A lightweight, single-disk setup designed for minimal resource consumption. It is ideal for developers getting started with RustFS, though it lacks data redundancy.",
  },
  {
    title: "SNMD",
    subtitle: "Single-Node Multiple-Disk",
    bestFor: "Small organizations managing tens of Terabytes (TB) of data.",
    overview: "Maximizes storage efficiency by using Erasure Coding across multiple drives. It protects against disk failures, while node availability still depends on single-node uptime.",
  },
  {
    title: "MNMD",
    subtitle: "Multiple-Node Multiple-Disk",
    bestFor: "Medium to large enterprises scaling from hundreds of Terabytes to Petabytes (PB).",
    overview: "A fully distributed, high-availability architecture that spreads data across nodes and drives for stronger fault tolerance, seamless scalability, and enterprise-grade security.",
  },
];

export default function InstallationTopology() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground">Installation Topology</h2>
          <p className="mt-4 text-muted-foreground">
            Choose the deployment shape that matches your durability, availability, and scale requirements.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {topologies.map((item) => (
            <article key={item.title} className="rounded-lg border border-border bg-card p-6">
              <div className="text-sm font-semibold text-brand">{item.title}</div>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{item.subtitle}</h3>
              <p className="mt-4 text-sm font-semibold text-foreground">Best for</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.bestFor}</p>
              <p className="mt-4 text-sm font-semibold text-foreground">Overview</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.overview}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
