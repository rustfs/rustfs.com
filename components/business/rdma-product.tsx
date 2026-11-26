import { CheckIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  PEAK_GET_AXIS_MAX_GIBPS,
  PEAK_PUT_AXIS_MAX_GIBPS,
  labSetup,
  peakThroughput,
  sameConcurrency,
  type PeakSizeRow,
} from "@/data/rdma-performance";
import { cn } from "@/lib/utils";

const docsLinkClassName =
  "text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <h2 className="type-headline-md sm:type-headline-lg text-foreground">{title}</h2>
      <div className="mt-4 min-w-0 space-y-4 text-base leading-8 text-muted-foreground">{children}</div>
    </section>
  );
}

function CheckList({
  items,
}: {
  items: { title: string; description: ReactNode }[];
}) {
  return (
    <div className="mt-8 divide-y divide-border border border-border bg-card">
      {items.map((item) => (
        <article key={item.title} className="grid gap-4 p-6 sm:grid-cols-[2.5rem_1fr]">
          <span className="flex size-9 items-center justify-center bg-background text-brand">
            <CheckIcon className="size-4" />
          </span>
          <div>
            <h3 className="type-title text-foreground">{item.title}</h3>
            <p className="type-body-md mt-2 text-muted-foreground">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function DiagramFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-10 overflow-hidden border border-border bg-card p-5 sm:p-7">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function PathChip({
  kind,
  children,
}: {
  kind: "control" | "data" | "backend";
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "px-3 py-2 text-center font-mono text-[10px] font-semibold uppercase leading-4 tracking-[0.12em]",
        kind === "control" && "border border-dashed border-muted-foreground/50 bg-background text-muted-foreground",
        kind === "data" && "border border-brand/60 bg-brand/5 text-foreground",
        kind === "backend" && "border border-warning/70 bg-warning/10 text-foreground"
      )}
    >
      {children}
    </p>
  );
}

function LegendItem({
  kind,
  children,
}: {
  kind: "control" | "data" | "backend";
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={cn(
          "mt-2 h-0.5 w-6 shrink-0",
          kind === "control" && "border-t border-dashed border-muted-foreground",
          kind === "data" && "bg-brand",
          kind === "backend" && "bg-warning"
        )}
      />
      <span>{children}</span>
    </li>
  );
}

function S3PathDiagram() {
  return (
    <DiagramFrame>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch">
        <div className="border border-border bg-background p-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Client
          </p>
          <p className="mt-3 text-sm font-semibold text-foreground">Signed S3 request</p>
          <p className="mt-1 text-sm text-muted-foreground">Registered memory</p>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Object bytes stay in the client buffer. The server reads that buffer for PUT and UploadPart.
          </p>
        </div>
        <div className="grid content-center gap-3">
          <PathChip kind="control">S3 HTTPS :9000 · auth / object selection / storage result</PathChip>
          <PathChip kind="data">PUT / UploadPart · server RDMA read →</PathChip>
          <PathChip kind="data">← GET · server RDMA write</PathChip>
        </div>
        <div className="border border-brand/60 bg-brand/5 p-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-brand">
            RustFS server
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <p className="border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground">
              Authorization
            </p>
            <p className="border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground">
              Storage
            </p>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            The server starts one-sided RDMA. GET writes into registered client memory.
          </p>
        </div>
      </div>
      <ul className="mt-5 grid gap-3 border-t border-border pt-4 text-xs leading-5 text-muted-foreground sm:grid-cols-2">
        <LegendItem kind="data">
          Solid: object bytes move with one-sided RDMA. The last hop may be NIXL/UCX or cuObject.
        </LegendItem>
        <LegendItem kind="control">
          Dashed: S3 HTTPS control plane for authentication, authorization, object selection, and the storage result.
        </LegendItem>
      </ul>
    </DiagramFrame>
  );
}

function IoFlowDiagram() {
  return (
    <DiagramFrame>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_9.5rem_minmax(0,1.35fr)_9.5rem_minmax(0,0.85fr)] lg:items-stretch">
        <div className="border border-border bg-background p-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Client
          </p>
          <p className="mt-3 text-sm font-semibold text-foreground">Registered memory</p>
          <div className="mt-3 border border-border bg-card p-3">
            <p className="text-sm font-semibold text-foreground">Object buffer</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">PUT enters. GET returns.</p>
          </div>
        </div>

        <div className="grid content-center gap-3">
          <PathChip kind="control">S3 HTTPS :9000</PathChip>
          <PathChip kind="data">NIXL/UCX or cuObject</PathChip>
          <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Object PUT / GET
          </p>
        </div>

        <div className="border border-brand/60 bg-brand/5 p-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-brand">
            RustFS server
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            PUT writes erasure-coded shards. GET rebuilds the object from shards.
          </p>
          <div className="mt-4 grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)]">
            <div className="border border-border bg-background p-3">
              <p className="text-sm font-semibold text-foreground">Node 1</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Shards</p>
            </div>
            <div className="grid gap-2">
              <PathChip kind="data">NIXL</PathChip>
              <PathChip kind="control">HTTPS / gRPC</PathChip>
            </div>
            <div className="border border-border bg-background p-3">
              <p className="text-sm font-semibold text-foreground">Node 2</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Shards</p>
            </div>
          </div>
        </div>

        <div className="grid content-center gap-3">
          <PathChip kind="backend">NVMe / RDMA</PathChip>
          <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Block read / write
          </p>
        </div>

        <div className="border border-border bg-background p-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Physical storage
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Block-device namespace</p>
          <div className="mt-3 grid gap-2">
            <p className="border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground">Storage 1</p>
            <p className="border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground">Storage 2</p>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Shard read and write</p>
        </div>
      </div>
      <ul className="mt-5 grid gap-3 border-t border-border pt-4 text-xs leading-5 text-muted-foreground lg:grid-cols-3">
        <LegendItem kind="data">
          Solid: object and shard data. The client last hop is NIXL/UCX or cuObject. Node-to-node shards may use NIXL.
        </LegendItem>
        <LegendItem kind="control">
          Dashed: HTTPS / gRPC control plane for authentication, sessions, locks, metadata, and object selection.
        </LegendItem>
        <LegendItem kind="backend">
          Orange: backend NVMe / RDMA. This path is separate from S3 Over RDMA and from the NIXL/UCX last hop.
        </LegendItem>
      </ul>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Window notifications and acknowledgments use the native transport channel.
      </p>
    </DiagramFrame>
  );
}

function plotHeight(value: string, axisMax: number) {
  const measured = Number(value);
  if (!Number.isFinite(measured) || measured <= 0) {
    return 0;
  }
  return Math.min(100, (measured / axisMax) * 100);
}

function ThroughputChart({
  title,
  axisMax,
  read,
}: {
  title: "PUT" | "GET";
  axisMax: number;
  read: (row: PeakSizeRow) => { rdma: string; http: string | null };
}) {
  const midpoint = axisMax / 2;

  return (
    <figure className="w-full min-w-0 max-w-full border border-border bg-card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <figcaption className="type-title text-foreground">{title}</figcaption>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">GiB/s</p>
      </div>
      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <li className="inline-flex items-center gap-2">
          <span className="size-2.5 bg-brand" />
          RDMA
        </li>
        <li className="inline-flex items-center gap-2">
          <span className="size-2.5 bg-foreground/55" />
          HTTP
        </li>
        <li className="inline-flex items-center gap-2">
          <span aria-hidden="true">—</span>
          Not measured
        </li>
      </ul>
      <div className="mt-6 w-full max-w-full overflow-x-auto">
        <div className="min-w-[34rem]" aria-hidden="true">
          <div className="grid grid-cols-6 gap-2 pl-8">
            {peakThroughput.map((row) => {
              const point = read(row);
              return (
                <div key={`${title}-${row.sizeMiB}-label`} className="grid grid-cols-2 gap-1 text-center font-mono text-[10px] font-semibold tabular-nums">
                  <span className="text-foreground">{point.rdma}</span>
                  <span className={point.http ? "text-foreground" : "text-muted-foreground"}>
                    {point.http ?? "—"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-1 flex">
            <div className="flex h-36 w-8 shrink-0 flex-col justify-between font-mono text-[9px] tabular-nums text-muted-foreground">
              <span>{axisMax}</span>
              <span>{midpoint}</span>
              <span>0</span>
            </div>
            <div className="grid flex-1 grid-cols-6 gap-2 border-b border-l border-border">
              {peakThroughput.map((row) => {
                const point = read(row);
                const rdmaHeight = plotHeight(point.rdma, axisMax);
                const httpHeight = point.http ? plotHeight(point.http, axisMax) : 0;
                return (
                  <div key={`${title}-${row.sizeMiB}-bar`} className="relative h-36">
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-border" />
                    <svg viewBox="0 0 64 100" className="relative h-full w-full" preserveAspectRatio="none">
                      <rect x="8" y={100 - rdmaHeight} width="20" height={rdmaHeight} className="fill-brand" />
                      {point.http ? (
                        <rect x="36" y={100 - httpHeight} width="20" height={httpHeight} className="fill-foreground/55" />
                      ) : null}
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-6 gap-2 pl-8 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {peakThroughput.map((row) => (
              <p key={`${title}-${row.sizeMiB}-size`}>{row.sizeMiB} MiB</p>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

function PeakTable() {
  return (
        <div className="mt-8 w-full max-w-full overflow-x-auto border border-border bg-card">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <caption className="border-b border-border px-5 py-4 text-left text-base font-semibold text-foreground">
          Peak valid throughput (GiB/s)
        </caption>
        <thead>
          <tr className="border-b border-border font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <th scope="col" className="px-5 py-3 font-semibold">Object size</th>
            <th scope="col" className="px-5 py-3 font-semibold">PUT RDMA</th>
            <th scope="col" className="px-5 py-3 font-semibold">PUT HTTP</th>
            <th scope="col" className="px-5 py-3 font-semibold">GET RDMA</th>
            <th scope="col" className="px-5 py-3 font-semibold">GET HTTP</th>
          </tr>
        </thead>
        <tbody>
          {peakThroughput.map((row) => (
            <tr key={row.sizeMiB} className="border-b border-border align-top last:border-b-0">
              <th scope="row" className="px-5 py-4 font-semibold text-foreground">{row.sizeMiB} MiB</th>
              <td className="px-5 py-4 tabular-nums text-foreground">{row.putRdmaGiBps}</td>
              <td className="px-5 py-4 text-muted-foreground">{row.putHttpGiBps ?? "Not measured"}</td>
              <td className="px-5 py-4 tabular-nums text-foreground">{row.getRdmaGiBps}</td>
              <td className="px-5 py-4 text-muted-foreground">{row.getHttpGiBps ?? "Not measured"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RdmaProductContent() {
  return (
    <>
      <Section id="s3-over-rdma" title="S3 HTTPS and one-sided RDMA">
        <p>
          The client sends a signed S3 request and registers memory for the object bytes. RustFS keeps SigV4 authentication, authorization, object selection, and the storage result on S3 HTTPS. That listener is the main server address (<span className="font-mono text-sm text-foreground">RUSTFS_ADDRESS</span>, default :9000). Object bytes do not enter the HTTP body.
        </p>
        <p>
          The server starts one-sided RDMA. It reads the client buffer for PUT and UploadPart, and it writes into registered client memory for GET. Window notifications and acknowledgments use the native transport channel.
        </p>
        <S3PathDiagram />
        <CheckList
          items={[
            {
              title: "Control plane stays signed S3",
              description:
                "Authentication, authorization, object selection, and the storage result stay on S3 HTTPS. The data path does not replace that control plane.",
            },
            {
              title: "Server-initiated RDMA",
              description:
                "PUT and UploadPart are a server RDMA read of the client buffer. GET is a server RDMA write into registered client memory.",
            },
            {
              title: "Enterprise kernel, off by default",
              description:
                "S3 Over RDMA is an enterprise-kernel capability. It is not compiled into the community default build, and it is not on unless an operator enables a last-hop transport.",
            },
          ]}
        />
      </Section>

      <Section id="last-hop-transports" title="Two optional last-hop transports">
        <p>
          One pipeline can use either of two last-hop transports for object bytes: NIXL/UCX, or cuObject. NVIDIA calls cuObject GPUDirect Storage for Objects. It is not classic POSIX GDS (cuFile / nvidia-fs). RustFS does not implement classic filesystem GDS on this path.
        </p>
        <p>
          Both transports are feature-gated. Each runtime switch defaults to false. Node-to-node shard traffic can use NIXL separately. cuObject is not that node-to-node path.
        </p>
        <div className="mt-8 w-full max-w-full overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="border-b border-border px-5 py-4 text-left text-base font-semibold text-foreground">
              Build flag, runtime switch, and default
            </caption>
            <thead>
              <tr className="border-b border-border font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <th scope="col" className="px-5 py-3 font-semibold">Transport</th>
                <th scope="col" className="px-5 py-3 font-semibold">Build</th>
                <th scope="col" className="px-5 py-3 font-semibold">Runtime</th>
                <th scope="col" className="px-5 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border align-top">
                <th scope="row" className="px-5 py-4 font-semibold text-foreground">NIXL/UCX</th>
                <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-foreground">--features nixl</td>
                <td className="whitespace-nowrap px-5 py-4 leading-6 text-muted-foreground">
                  <span className="font-mono text-xs text-foreground">RUSTFS_NIXL_ENABLE</span>, default false
                </td>
                <td className="px-5 py-4 leading-6 text-muted-foreground">
                  Optional last hop. The server issues UCX read and write.
                </td>
              </tr>
              <tr className="align-top">
                <th scope="row" className="px-5 py-4 font-semibold text-foreground">cuObject</th>
                <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-foreground">--features cuobject</td>
                <td className="whitespace-nowrap px-5 py-4 leading-6 text-muted-foreground">
                  <span className="font-mono text-xs text-foreground">RUSTFS_CUOBJECT_ENABLE</span>, default false
                </td>
                <td className="px-5 py-4 leading-6 text-muted-foreground">
                  Optional last hop. This is GPUDirect Storage for Objects, not classic POSIX GDS (cuFile / nvidia-fs).
                </td>
              </tr>
            </tbody>
          </table>
          <p className="border-t border-border px-5 py-4 text-xs leading-6 text-muted-foreground">
            Both options belong to the enterprise kernel. They are absent from the community default build, and the runtime switches stay off until set. Node-to-node shards can use NIXL with <span className="font-mono text-foreground">RUSTFS_INTERNODE_DATA_TRANSPORT=nixl</span>.
          </p>
        </div>
      </Section>

      <Section id="io-flow" title="I/O flow">
        <p>
          The client last hop, traffic between RustFS nodes, and the path to physical storage are separate. The client last hop is optionally NIXL/UCX or cuObject, and that choice stays off until enabled. Authentication, sessions, locks, metadata, and object selection stay on HTTPS or gRPC.
        </p>
        <p>
          Between nodes, shard data can use NIXL when <span className="font-mono text-sm text-foreground">RUSTFS_INTERNODE_DATA_TRANSPORT=nixl</span>. Backend block devices can use NVMe over RDMA. That backend path is drawn separately from S3 Over RDMA and from the NIXL/UCX last hop. PUT writes erasure-coded shards. GET rebuilds the object from those shards and returns it to the client.
        </p>
        <IoFlowDiagram />
        <CheckList
          items={[
            {
              title: "Optional client last hop",
              description:
                "Object PUT and GET may use NIXL/UCX or cuObject. Both default off. Node-to-node shards can use NIXL on their own switch. cuObject is not the path between nodes.",
            },
            {
              title: "Control plane on HTTPS / gRPC",
              description:
                "Authentication, sessions, locks, metadata, and object selection use the control plane, including between nodes. Window notifications and acknowledgments use the native transport channel.",
            },
            {
              title: "Backend NVMe / RDMA stays separate",
              description:
                "Block devices may use NVMe over RDMA. PUT is erasure-coded into storage. GET is rebuilt from shards before it returns to the client. This is not the S3 Over RDMA last hop.",
            },
          ]}
        />
      </Section>

      <Section id="laboratory-performance" title="Laboratory performance">
        <p>
          In a laboratory test on 18–19 November 2026, S3 Over RDMA throughput was higher than HTTP for the object sizes and operations that both protocols measured. Same-concurrency throughput ratios in this campaign were 1.45x to 2.05x. These figures are one lab campaign. They are not a production SLA, and they do not describe every deployment.
        </p>
        <p>
          The charts show the highest valid scan round for each protocol, object size, and operation. An em dash means this two-client EC:3 campaign has no valid HTTP measurement for that cell. The bar is omitted. It is not a zero result. The matched-concurrency table is a separate cut of the same campaign, so a peak value can differ from the row at a fixed concurrency.
        </p>
        <div className="mt-8 grid w-full min-w-0 gap-4 lg:grid-cols-2">
          <ThroughputChart
            title="PUT"
            axisMax={PEAK_PUT_AXIS_MAX_GIBPS}
            read={(row) => ({ rdma: row.putRdmaGiBps, http: row.putHttpGiBps })}
          />
          <ThroughputChart
            title="GET"
            axisMax={PEAK_GET_AXIS_MAX_GIBPS}
            read={(row) => ({ rdma: row.getRdmaGiBps, http: row.getHttpGiBps })}
          />
        </div>
        <p className="text-xs leading-6 text-muted-foreground">{labSetup} PUT is scaled to 4 GiB/s and GET is scaled to 12 GiB/s, so bar height is comparable inside a chart and not across the two charts.</p>
        <PeakTable />
        <div className="mt-10 w-full max-w-full overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="border-b border-border px-5 py-4 text-left text-base font-semibold text-foreground">
              Same concurrency, RDMA and HTTP
            </caption>
            <thead>
              <tr className="border-b border-border font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <th scope="col" className="px-5 py-3 font-semibold">Size</th>
                <th scope="col" className="px-5 py-3 font-semibold">Operation</th>
                <th scope="col" className="px-5 py-3 font-semibold">Concurrency</th>
                <th scope="col" className="px-5 py-3 font-semibold">Throughput GiB/s (RDMA / HTTP)</th>
                <th scope="col" className="px-5 py-3 font-semibold">P99 ms (RDMA / HTTP)</th>
                <th scope="col" className="px-5 py-3 font-semibold">Throughput ratio</th>
              </tr>
            </thead>
            <tbody>
              {sameConcurrency.map((row) => (
                <tr key={`${row.sizeMiB}-${row.operation}-${row.concurrency}`} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-5 py-4 font-semibold text-foreground">{row.sizeMiB} MiB</th>
                  <td className="px-5 py-4 text-foreground">{row.operation}</td>
                  <td className="px-5 py-4 tabular-nums text-muted-foreground">{row.concurrency}</td>
                  <td className="px-5 py-4 tabular-nums text-foreground">{row.rdmaGiBps} / {row.httpGiBps}</td>
                  <td className="px-5 py-4 tabular-nums text-muted-foreground">{row.rdmaP99Ms} / {row.httpP99Ms}</td>
                  <td className="px-5 py-4 font-semibold tabular-nums text-brand">{row.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-border px-5 py-4 text-xs leading-6 text-muted-foreground">
            {labSetup} Ratios use the matched-concurrency rows above. They are not a production commitment.
          </p>
        </div>
      </Section>

      <p className="border-t border-border pt-8 text-sm leading-7 text-muted-foreground">
        S3 request signing is documented in the{" "}
        <a
          href="https://docs.rustfs.com/en/administration/protocols/s3"
          className={docsLinkClassName}
          rel="noreferrer"
          target="_blank"
        >
          S3 protocol guide
        </a>
        . Enable a last-hop transport only on an enterprise-kernel build, then validate the operations your application uses.
      </p>
    </>
  );
}
