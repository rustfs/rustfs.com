
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
    <section className="bg-muted/40 relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32">
      <div className="max-w-7xl mx-auto">
        <p className="font-display text-base text-foreground font-bold text-center">
          {
            "Trusted by the open-source community / Enterprise-grade open source solution"
          }
        </p>
        <p className="font-display text-base text-muted-foreground font-bold text-center">compatible with over Compatible with 1,500+ applications and integrations</p>
        <ul
          role="list"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:flex-col sm:gap-x-0 sm:gap-y-10 md:flex-row xl:gap-x-16 xl:gap-y-6"
        >
          {softwares.map((software) => {
            const IconComponent = iconMap[software];

            return (
              <li key={software} className="flex">
                <div className="w-40 h-20 text-foreground/70 transition-colors duration-200 flex items-center justify-center">
                  <IconComponent
                    className="w-full h-full"
                    style={{ color: "currentColor" }}
                    fill="currentColor"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
