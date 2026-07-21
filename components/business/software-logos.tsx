
import ClickhouseIcon from "../../public/svgs/softwares/clickhouse.svg";
import DockerIcon from "../../public/svgs/softwares/docker.svg";
import ElasticIcon from "../../public/svgs/softwares/elastic.svg";
import GrafanaIcon from "../../public/svgs/softwares/grafana.svg";
import KafkaIcon from "../../public/svgs/softwares/kafka.svg";
import MysqlIcon from "../../public/svgs/softwares/mysql.svg";
import NginxIcon from "../../public/svgs/softwares/nginx.svg";
import PostgresqlIcon from "../../public/svgs/softwares/postgresql.svg";
import PrometheusIcon from "../../public/svgs/softwares/prometheus.svg";
import SparkIcon from "../../public/svgs/softwares/spark.svg";
import TensorflowIcon from "../../public/svgs/softwares/tensorflow.svg";
import WebhooksIcon from "../../public/svgs/softwares/webhooks.svg";
import HomeSectionHeader from "./home-section-header";

type SoftwareKey =
  | "docker"
  | "elastic"
  | "grafana"
  | "kafka"
  | "mysql"
  | "nginx"
  | "postgresql"
  | "clickhouse"
  | "prometheus"
  | "spark"
  | "tensorflow"
  | "webhooks";

const softwares: SoftwareKey[] = [
  "docker",
  "elastic",
  "grafana",
  "kafka",
  "mysql",
  "nginx",
  "postgresql",
  "clickhouse",
  "prometheus",
  "spark",
  "tensorflow",
  "webhooks",
];

const softwareLabels: Record<SoftwareKey, string> = {
  docker: "Docker",
  elastic: "Elastic",
  grafana: "Grafana",
  kafka: "Kafka",
  mysql: "MySQL",
  nginx: "Nginx",
  postgresql: "PostgreSQL",
  clickhouse: "ClickHouse",
  prometheus: "Prometheus",
  spark: "Spark",
  tensorflow: "TensorFlow",
  webhooks: "Webhooks",
};

const iconMap: Record<SoftwareKey, React.ComponentType<{ className?: string; style?: React.CSSProperties; fill?: string }>> = {
  docker: DockerIcon,
  elastic: ElasticIcon,
  grafana: GrafanaIcon,
  kafka: KafkaIcon,
  mysql: MysqlIcon,
  nginx: NginxIcon,
  postgresql: PostgresqlIcon,
  clickhouse: ClickhouseIcon,
  prometheus: PrometheusIcon,
  spark: SparkIcon,
  tensorflow: TensorflowIcon,
  webhooks: WebhooksIcon,
};

export default function SoftwareLogos() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="01"
          eyebrow="Evaluation surface"
          title="Start with the tools your teams already know"
          description="RustFS exposes familiar S3 and infrastructure interfaces. Validate the exact API and workflow coverage your application needs before production rollout."
        />
        <div className="border-y border-border bg-card/20">
          <ul role="list" className="grid gap-px bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
            {softwares.map((software) => {
              const IconComponent = iconMap[software];

              return (
                <li
                  key={software}
                  className="group relative grid min-h-24 place-items-center overflow-hidden bg-background/80 px-6 py-4 transition-colors duration-300 before:absolute before:inset-0 before:opacity-0 before:transition-[opacity,background-position] before:duration-500 before:[background-image:repeating-linear-gradient(135deg,transparent_0,transparent_12px,var(--muted)_12px,var(--muted)_24px)] before:[background-position:0_0] before:[background-size:34px_34px] hover:bg-muted/35 hover:before:opacity-20 hover:before:[background-position:34px_0] sm:min-h-28"
                >
                  <span className="relative z-10 grid h-14 w-full max-w-40 place-items-center text-foreground/75 transition duration-300 group-hover:-translate-y-0.5 group-hover:text-foreground sm:h-16 sm:max-w-44">
                    <IconComponent
                      className="block h-full w-full"
                      style={{ color: "currentColor" }}
                      fill="currentColor"
                    />
                  </span>
                  <span className="sr-only">
                    {softwareLabels[software]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Logos indicate common evaluation paths, not certification. See the{' '}
          <a className="font-semibold text-foreground hover:text-brand" href="https://docs.rustfs.com/features/s3-compatibility/" target="_blank" rel="noopener noreferrer">
            published S3 compatibility overview ↗
          </a>
          .
        </p>
      </div>
    </section>
  );
}
