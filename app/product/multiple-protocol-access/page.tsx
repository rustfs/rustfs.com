import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/multiple-protocol-access/" },
  title: "Multi-protocol access | S3, Swift, WebDAV, FTP/FTPS & MCP | RustFS",
  description: "S3 is the primary RustFS API. WebDAV and FTP/FTPS are built-in gateways that stay off until enabled. Swift is an optional build. MCP is a separate server. Configure the endpoint and validate client operations.",
  keywords: [
    "RustFS",
    "multi-protocol access",
    "S3 API",
    "OpenStack Swift",
    "WebDAV",
    "FTP",
    "FTPS",
    "Model Context Protocol",
    "MCP AI",
    "data silos",
    "legacy modernization",
    "MinIO",
  ],
};

const docsLinkClassName = "text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand";

const protocolRows = [
  {
    protocol: "S3",
    defaultState: "On. Served by the main listener (RUSTFS_ADDRESS, default :9000). No separate protocol switch.",
    setup: "Set the endpoint, region, credentials, and addressing style. Configure TLS before exposing the listener. Virtual-hosted-style URLs also need RUSTFS_SERVER_DOMAINS.",
    href: "https://docs.rustfs.com/en/administration/protocols/s3",
  },
  {
    protocol: "WebDAV",
    defaultState: "Off. Compiled into the standard binary. RUSTFS_WEBDAV_ENABLE defaults to false.",
    setup: "Enable the gateway, provide IAM credentials, and configure HTTPS certificates for any remote or production client. Then connect.",
    href: "https://docs.rustfs.com/en/administration/protocols/webdav",
  },
  {
    protocol: "FTP/FTPS",
    defaultState: "Off. Compiled into the standard binary. The FTP and FTPS listeners both default to disabled.",
    setup: "Enable only the listener you need. Use FTPS with certificates for production. Plain FTP is for isolated testing. Passive ports and an advertised address may be required.",
    href: "https://docs.rustfs.com/en/administration/protocols/ftps",
  },
  {
    protocol: "Swift",
    defaultState: "Not in the default build.",
    setup: "Build with the swift feature and configure Keystone token validation. Account HEAD and non-JSON listings are not implemented. Validate the client workflow.",
    href: "https://docs.rustfs.com/en/administration/protocols/swift",
  },
  {
    protocol: "MCP",
    defaultState: "Not a listener on the storage server. Separate MCP server.",
    setup: "Run the MCP server and pass S3 credentials plus the RustFS endpoint to the assistant. The docs warn that in-tree build steps may be outdated, so confirm them before you rely on a from-source build.",
    href: "https://docs.rustfs.com/en/developer/mcp",
  },
];

const sections: FeaturePageSection[] = [
  {
    title: "S3 API compatibility",
    description: "The primary object-storage API. It covers common bucket, object, listing, multipart, and access-control workflows, and it is not identical to every AWS S3 or MinIO API.",
    items: [
      {
        title: "Common S3 workflows",
        description: "Documented coverage includes bucket and object operations, listing, multipart upload, versioning, lifecycle, IAM, bucket policies, and server-side encryption workflows. Review the known differences before you depend on advanced behavior.",
        href: "https://docs.rustfs.com/en/administration/protocols/s3",
      },
      {
        title: "Enabled on the main listener",
        description: "The S3 API starts with the server. Clients still need an endpoint, region, credentials, and addressing style. Path-style is the default.",
      },
      {
        title: "MinIO migration notes",
        description: "Use familiar S3 SDKs, point them at the RustFS endpoint, and validate the operations your application uses. The linked guide is the recommended copy path onto a current 1.0 release.",
        href: "/blog/migrating-from-minio-to-rustfs-a-technical-guide/",
      },
      {
        title: "Virtual-hosted-style access",
        description: "Path-style needs no extra DNS. Virtual-hosted-style URLs require RUSTFS_SERVER_DOMAINS, matching DNS, and a certificate that covers the bucket hostnames.",
        href: "https://docs.rustfs.com/en/administration/protocols/s3",
      },
    ],
  },
  {
    title: "WebDAV",
    description: "A built-in WebDAV gateway for file-oriented clients. The gateway is compiled into the standard binary and disabled until you enable it.",
    items: [
      {
        title: "Client access after enablement",
        description: "Once enabled, WebDAV clients can list buckets and upload, download, rename, or delete objects. Directory listing uses PROPFIND. GET on a directory returns 405.",
        href: "https://docs.rustfs.com/en/administration/protocols/webdav",
      },
      {
        title: "Enable, then connect",
        description: "Set RUSTFS_WEBDAV_ENABLE, provide an access key and secret key, and configure HTTPS certificates for remote or production use. Basic authentication does not encrypt credentials by itself.",
      },
      {
        title: "HTTPS for production",
        description: "TLS for the WebDAV listener defaults to on and needs a certificate directory. Use HTTPS for every remote or production connection.",
      },
    ],
  },
  {
    title: "Swift API",
    description: "An optional OpenStack Swift-compatible API on the same HTTP endpoint as S3. It is not part of the default feature set.",
    items: [
      {
        title: "Optional build",
        description: "Build RustFS with the swift feature. There is no separate Swift port. Keystone tokens are accepted in X-Auth-Token or X-Storage-Token.",
        href: "https://docs.rustfs.com/en/administration/protocols/swift",
      },
      {
        title: "Scoped coexistence",
        description: "When Swift is built and Keystone validation is configured, Swift containers map to project-isolated buckets. Validate your client. Account HEAD requests and non-JSON listings are not implemented.",
      },
    ],
  },
  {
    title: "FTP/FTPS",
    description: "Built-in FTP and FTPS gateways for clients that cannot move to S3 yet. Both listeners are disabled until you enable one.",
    items: [
      {
        title: "Enable a listener",
        description: "Turn on FTP or FTPS explicitly. Authenticate with a RustFS access key and secret key. Rename and append uploads are not supported.",
        href: "https://docs.rustfs.com/en/administration/protocols/ftps",
      },
      {
        title: "FTPS for production",
        description: "Use explicit FTPS with certificates, credentials, and passive-port rules for production. Bind plain FTP to an isolated test network only.",
      },
    ],
  },
  {
    title: "MCP",
    description: "A separate Model Context Protocol server for assistants that need a limited set of S3 tools. It is not enabled on the storage listener.",
    items: [
      {
        title: "Separate MCP server",
        description: "The server exposes tools such as list buckets, list objects, upload, get, create bucket, and delete bucket. It is not a default protocol on the RustFS process.",
        href: "https://docs.rustfs.com/en/developer/mcp",
      },
      {
        title: "Configure credentials first",
        description: "Pass S3 credentials and the RustFS endpoint to the assistant. The docs say the rustfs-mcp crate may no longer be on the current main branch, so confirm the build location before compiling from source.",
      },
    ],
  },
];

function ProtocolSetupTable() {
  return (
    <div className="mb-16 overflow-x-auto border border-border bg-card">
      <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
        <caption className="border-b border-border px-5 py-4 text-left text-base font-semibold text-foreground">
          Protocol, default, and setup
        </caption>
        <thead>
          <tr className="border-b border-border font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <th scope="col" className="px-5 py-3 font-semibold">Protocol</th>
            <th scope="col" className="px-5 py-3 font-semibold">Default</th>
            <th scope="col" className="px-5 py-3 font-semibold">Setup needed</th>
            <th scope="col" className="px-5 py-3 font-semibold">Docs</th>
          </tr>
        </thead>
        <tbody>
          {protocolRows.map((row) => (
            <tr key={row.protocol} className="border-b border-border align-top last:border-b-0">
              <th scope="row" className="px-5 py-4 font-semibold text-foreground">{row.protocol}</th>
              <td className="px-5 py-4 leading-6 text-muted-foreground">{row.defaultState}</td>
              <td className="px-5 py-4 leading-6 text-muted-foreground">{row.setup}</td>
              <td className="px-5 py-4">
                <a href={row.href} className={docsLinkClassName} rel="noreferrer" target="_blank">
                  Docs
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border px-5 py-4 text-xs leading-6 text-muted-foreground">
        Each cell follows the linked documentation. This is not a compatibility matrix, and an empty or uncertain behavior is left to the docs instead of marked as supported.
      </p>
    </div>
  );
}

export default function MultipleProtocolAccessPage() {
  return (
    <FeaturePage
      title="Multi-protocol access"
      description="S3 is the primary object-storage API. WebDAV and FTP/FTPS are built-in gateways that stay disabled until you enable them. Swift requires an optional build. MCP is a separate server you point at the S3 endpoint. No separate third-party protocol gateway is required for the built-in WebDAV and FTP/FTPS gateways. Configure the endpoint, credentials, and protocol switch, then validate the operations your application uses."
      sections={sections}
      variant="protocol"
      highlightsTitle="S3 first"
      highlights={[
        {
          title: "Primary API",
          description: "The S3 API is on the main listener. Other protocols need the enablement, build, or separate server documented for that protocol.",
        },
        {
          title: "Built-in gateways",
          description: "WebDAV and FTP/FTPS ship in the standard binary as gateways. They are off by default. Swift is not in the default build.",
        },
        {
          title: "Validate the client",
          description: "Point a familiar SDK or client at the RustFS endpoint and test the operations you depend on. Compatibility is scoped to the documented workflows.",
        },
      ]}
      links={[
        { label: "Download", href: "/download" },
        { label: "S3 protocol docs", href: "https://docs.rustfs.com/en/administration/protocols/s3", variant: "outline" },
      ]}
    >
      <ProtocolSetupTable />
    </FeaturePage>
  );
}
