'use client'
import { WordRotate } from "@/components/magicui/word-rotate";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import DemoLink from "./buttons/demo-link";
import DownloadLink from "./buttons/download-link";
import GetStartedButton from "./buttons/get-started";

// 导入所有软件SVG图标
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

export default function HomeHero() {
  const { tw, language } = useI18n();
  console.log(language);

  // public/svgs/softwares/*.svg
  const softwares = ['docker', 'elastic', 'grafana', 'kafka', 'mysql', 'nginx', 'postgresql', 'clickhouse', 'prometheus', 'spark', 'tensorflow', 'webhooks']

  // 创建图标映射
  const iconMap = {
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

  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto font-display text-4xl font-extrabold tracking-wide text-primary sm:text-5xl md:text-6xl xl:text-7xl flex flex-col items-center">
        <div className={cn('flex flex-col items-center w-full', tw('xl:flex-row xl:justify-center', ''))}>
          <span>{tw('Rust 驱动的', 'Rust-powered', 'Rust destekli')}</span>
          <div className={cn('flex flex-col items-center justify-center w-full', language == 'zh' ? 'xl:w-[300px]' : '')}>
            <span className={cn('relative whitespace-nowrap text-blue-600', language == 'zh' ? 'inline-flex' : 'inline-flex justify-center mx-auto')}>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className={cn("absolute top-2/3 mx-auto w-full h-[0.58em] fill-blue-300/70", language == 'zh' ? 'w-[300px]' : 'w-[600px]')}
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className={cn('relative flex', language == 'zh' ? 'xl:w-[300px]' : 'justify-center')}>
                <WordRotate words={[tw('高性能', 'High Performance', 'Yüksek Performans'), tw('无限扩容', 'Unlimited Scaling', 'Sınırsız Ölçeklendirme'), tw('安全可靠', 'Secure and Reliable', 'Güvenli ve Güvenilir'), tw('多云存储', 'Multi-cloud Storage', 'Çoklu Bulut Depolama'), tw('S3 兼容', 'S3 Compatible', 'S3 Uyumlu')]} className="text-left" />
              </span>
            </span>
          </div>
        </div>
        <span>{tw('分布式存储系统', 'Distributed Storage System', 'Dağıtık Depolama Sistemi')}</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-secondary-foreground">
        {tw('RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。', 'RustFS is developed with the popular and secure Rust language, compatible with S3 protocol. Suitable for AI/ML and massive data storage, big data, internet, industrial and confidential storage scenarios. Nearly free to use. Follows Apache 2 license, supports domestic confidential equipment and systems.', 'RustFS popüler ve güvenli Rust dili ile geliştirilmiş, S3 protokolü ile uyumludur. AI/ML ve büyük veri depolama, büyük veri, internet, endüstriyel ve gizli depolama senaryoları için uygundur. Neredeyse ücretsiz kullanım. Apache 2 lisansını takip eder, yerli gizli ekipman ve sistemleri destekler.')}
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <GetStartedButton />
        <DownloadLink />
        <DemoLink className="hidden md:inline-flex" />
      </div>
      <div className="mt-36 lg:mt-44">
        <p className="font-display text-base text-slate-500 font-bold">
          {tw('值得信赖的开源软件，超过 1500+ 款软件协议兼容适配', 'Trusted open source software, compatible with over 1500+ software protocols', 'Güvenilir açık kaynak yazılım, 1500+ yazılım protokolü ile uyumlu')}
        </p>
        <ul
          role="list"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:flex-col sm:gap-x-0 sm:gap-y-10 md:flex-row xl:gap-x-16 xl:gap-y-6"
        >

          {softwares.map((software) => {
            const IconComponent = iconMap[software as keyof typeof iconMap];

            return (
              <li key={software} className="flex">
                <div className="w-40 h-20 text-gray-600 transition-colors duration-200 flex items-center justify-center">
                  <IconComponent
                    className="w-full h-full"
                    style={{ color: 'currentColor' }}
                    fill="currentColor"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section >
  )
}
