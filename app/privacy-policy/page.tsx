import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RustFS",
  description:
    "Learn how RustFS handles privacy for self-hosted software deployments and the RustFS official website.",
};

const sectionClassName =
  "border-t border-border pt-8 first:border-t-0 first:pt-0";
const headingClassName =
  "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl";
const subheadingClassName = "text-lg font-semibold text-foreground";
const paragraphClassName = "text-base leading-8 text-muted-foreground";
const listClassName =
  "list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground marker:text-brand";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Legal
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              How RustFS handles information across self-hosted software deployments and the official RustFS website.
            </p>
          </div>
          <p className="border border-border bg-card px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Effective July 23, 2026
          </p>
        </div>

        <article className="mx-auto mt-12 max-w-4xl space-y-12 border border-border bg-card p-6 sm:p-10 lg:p-12">
          <div className="space-y-5">
            <p className={paragraphClassName}>
              At RustFS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to respecting your privacy and protecting the data of our users and enterprise customers. RustFS is an open-source, high-performance distributed object storage platform designed from the ground up for self-hosted, on-premises, and cloud-native deployments.
            </p>
            <p className={paragraphClassName}>
              This Privacy Policy describes how information is handled in connection with:
            </p>
            <ol className="list-decimal space-y-3 pl-5 text-base leading-8 text-muted-foreground marker:font-semibold marker:text-brand">
              <li>
                <strong className="text-foreground">The RustFS Software</strong> (your deployed storage cluster or instances).
              </li>
              <li>
                <strong className="text-foreground">The RustFS Official Website</strong> (rustfs.com and its subdomains).
              </li>
            </ol>
          </div>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>
              1. RustFS Software Privacy Architecture (Self-Hosted Deployments)
            </h2>
            <p className={`${paragraphClassName} mt-5`}>
              Our privacy philosophy for the RustFS software is simple: <strong className="text-foreground">Your data belongs exclusively to you.</strong>
            </p>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>
                A. Zero Telemetry &amp; Zero Business Data Collection
              </h3>
              <p className={paragraphClassName}>
                The RustFS software operates entirely within your private infrastructure.
              </p>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">No Content or Metadata Access:</strong> RustFS does not, under any circumstances, collect, transmit, inspect, or store your application data, S3 object content, bucket metadata, user credentials, access keys, or network logs on external servers.
                </li>
                <li>
                  <strong className="text-foreground">No Behavioral Tracking:</strong> The software contains no hidden telemetry, analytics scripts, or background tracking mechanisms designed to monitor usage behavior, access patterns, or system configurations.
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>
                B. Minimal Version Check for Telemetry &amp; Statistics
              </h3>
              <p className={paragraphClassName}>
                To help us understand active platform adoption and guide future release engineering, the RustFS software includes a minimal, automated version checking mechanism.
              </p>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">What We Collect:</strong> The software periodically sends an automated ping containing <strong className="text-foreground">only the software version string</strong> (for example, <code className="border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-sm text-foreground">v1.2.0-beta</code>).
                </li>
                <li>
                  <strong className="text-foreground">What We Do NOT Collect:</strong> This request contains no personally identifiable information (PII), no server hostname, no IP storage details, no cluster topology, no storage volume metrics, and no hardware or MAC address identifiers.
                </li>
                <li>
                  <strong className="text-foreground">Purpose of Processing:</strong> This anonymous version data is aggregated strictly for <strong className="text-foreground">statistical purposes</strong>—specifically, to quantify total deployment counts, measure release distribution across the community, and prioritize maintenance support for active release versions.
                </li>
                <li>
                  <strong className="text-foreground">Opt-Out Control:</strong> You retain full control over this feature. The version ping can be disabled at any time during installation or cluster configuration by setting the environment variable <code className="border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-sm text-foreground">RUSTFS_TELEMETRY=off</code> (or as documented in our deployment guide).
                </li>
              </ul>
            </div>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>
              2. Information Collected via Our Official Website
            </h2>
            <p className={`${paragraphClassName} mt-5`}>
              When you visit our website (rustfs.com), interact with our web services, or submit online forms, we collect limited personal data to provide user support and business communications.
            </p>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>A. Information You Voluntarily Provide</h3>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">Contact &amp; Inquiry Forms:</strong> If you request enterprise support, fill out a &quot;Contact Us&quot; form, or sign up for product updates, we may collect your name, business email address, company name, and message details.
                </li>
                <li>
                  <strong className="text-foreground">Marketing Opt-In:</strong> If you explicitly opt in to receive news, event updates, or technical announcements, we process your email address based on your consent. You may withdraw your consent or unsubscribe at any time via the link at the bottom of our emails.
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>B. Automatically Collected Website Data</h3>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">Server Logs &amp; Analytics:</strong> Standard web server logs collect basic technical data (for example, browser type, operating system, referring URL, IP address, and timestamps) solely for security auditing, network performance monitoring, and anti-abuse enforcement.
                </li>
              </ul>
            </div>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>3. Legal Grounds for Processing (GDPR Compliance)</h2>
            <p className={`${paragraphClassName} mt-5`}>
              Under European data protection laws (GDPR Article 6), we process personal data under the following legal bases:
            </p>
            <ul className={`${listClassName} mt-4`}>
              <li>
                <strong className="text-foreground">Legitimate Interest:</strong> Operating our website securely, analyzing aggregate deployment statistics (anonymous version counts), and responding to user inquiries.
              </li>
              <li>
                <strong className="text-foreground">Consent:</strong> Sending marketing communications and newsletters where you have explicitly opted in.
              </li>
              <li>
                <strong className="text-foreground">Contractual Necessity:</strong> Delivering enterprise support, binary releases, or licensing services under a formal agreement.
              </li>
            </ul>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>4. Data Sharing, Selling, and Disclosure</h2>
            <p className={`${paragraphClassName} mt-5`}>
              We respect your data privacy and maintain a strict non-commercialization stance regarding personal information:
            </p>
            <ul className={`${listClassName} mt-4`}>
              <li>
                <strong className="text-foreground">No Data Selling:</strong> We do <strong className="text-foreground">not</strong> sell, rent, trade, or monetize your personal information or usage statistics to third parties.
              </li>
              <li>
                <strong className="text-foreground">Third-Party Service Providers:</strong> We may share website interaction data with trusted infrastructure vendors (for example, website hosting and transactional email services) strictly bound by data processing agreements (DPAs) and confidentiality obligations.
              </li>
              <li>
                <strong className="text-foreground">Legal Requirements:</strong> We will only disclose information if required by a binding court order, subpoena, or legally enforceable government request.
              </li>
            </ul>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>5. International Data Transfers</h2>
            <p className={`${paragraphClassName} mt-5`}>
              RustFS operates globally. If you interact with our website or submit personal information from the European Economic Area (EEA), UK, or Switzerland, your data may be transferred to and processed in countries outside your jurisdiction (such as the United States). In such cases, we ensure appropriate legal safeguards (such as Standard Contractual Clauses—SCCs) are in place to protect your data.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>6. Your Data Protection Rights</h2>
            <p className={`${paragraphClassName} mt-5`}>
              Depending on your jurisdiction (including under the GDPR, CCPA/CPRA, and PIPL), you hold the following rights regarding personal data held by us:
            </p>
            <ul className={`${listClassName} mt-4`}>
              <li><strong className="text-foreground">Right to Access:</strong> Request details about the personal data we process.</li>
              <li><strong className="text-foreground">Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your contact details or email subscription data.</li>
              <li><strong className="text-foreground">Right to Object &amp; Opt-Out:</strong> Object to processing based on legitimate interest or opt out of marketing updates at any time.</li>
              <li><strong className="text-foreground">Right to Data Portability:</strong> Obtain a copy of your personal data in a structured format.</li>
            </ul>
            <p className={`${paragraphClassName} mt-5`}>
              To exercise any of your rights, email us at{" "}
              <a className="font-medium text-brand underline-offset-4 hover:underline" href="mailto:hello@rustfs.com">
                hello@rustfs.com
              </a>.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>7. Security and Retention</h2>
            <p className={`${paragraphClassName} mt-5`}>
              We implement rigorous technical, organizational, and physical security controls (including TLS encryption, strict access controls, and boundary firewalls) to protect your information against unauthorized access, loss, or misuse. Personal contact data is retained only as long as necessary to fulfill the purpose for which it was collected or to comply with statutory legal retention requirements.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>8. Changes to This Privacy Policy</h2>
            <p className={`${paragraphClassName} mt-5`}>
              We may periodically update this Privacy Policy to reflect technical improvements, legal requirements, or operational changes. All revisions will be posted on this page with an updated &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>9. Contact Us</h2>
            <p className={`${paragraphClassName} mt-5`}>
              If you have questions, concerns, or requests regarding this Privacy Policy or RustFS data practices, please contact our legal/privacy team:
            </p>
            <address className="mt-5 border-l-2 border-brand pl-5 text-base not-italic leading-8 text-muted-foreground">
              <a className="font-medium text-brand underline-offset-4 hover:underline" href="mailto:hello@rustfs.com">
                hello@rustfs.com
              </a>
              <br />
              3550 Lenox Road, NE Atlanta, Georgia 30326
            </address>
          </section>
        </article>
      </section>
    </main>
  );
}
