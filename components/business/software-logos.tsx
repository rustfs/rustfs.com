
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
    <section className="relative overflow-hidden border-y border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="01"
          eyebrow="Integration surface"
          title="Works with the storage ecosystem"
          description="RustFS keeps S3 compatibility at the center, so existing analytics, observability, AI, and delivery tools can keep using the object storage interfaces they already know."
        />
        <div className="border border-border bg-card">
          <ul role="list" className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {softwares.map((software) => {
              const IconComponent = iconMap[software];

              return (
                <li key={software} className="flex min-h-36 flex-col items-center justify-center bg-card p-5 text-center sm:min-h-40">
                  <span className="flex h-16 w-full max-w-36 items-center justify-center text-foreground/75 sm:h-20 sm:max-w-44">
                    <IconComponent
                      className="h-full w-full"
                      style={{ color: "currentColor" }}
                      fill="currentColor"
                    />
                  </span>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {softwareLabels[software]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
