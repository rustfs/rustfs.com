import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '用现代对象存储替换 Hadoop HDFS',
  description: '现代数据湖和数据湖仓一体建立在现代对象存储之上。这意味着它们建立在 RustFS 之上。'
})

/* eslint-disable @next/next/no-img-element */
export default function HDFS() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-bg/banner-3.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center text-white">
          <h3 className="text-5xl font-bold">用现代对象存储<br />
            替换 Hadoop HDFS</h3>
          <p className="mt-4 text-lg">
            现代数据湖和数据湖仓一体建立在现代对象存储之上。<br />
            这意味着它们建立在 RustFS 之上。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-12 py-12 xl:py-12">
          <h4 className="text-primary  text-center text-xl font-bold">RustFS 是唯一一个具有性能和规模的对象存储平台， 可以介入并取代传统但任务关键型的 Hadoop HDFS 部署。</h4>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">分解</h4>
              <p>如今，将计算和存储分开已经很有意义了。存储需要超过计算 - 高达 10-1。计算节点是无状态的，并使用更多的 CPU 内核和内存进行了优化。存储节点是有状态的，可以使用更多更密集的驱动器和更高的带宽进行 I/O 优化。通过分解，企业可以实现卓越的经济效益、更好的可管理性、更高的可扩展性和更高的总拥有成本。HDFS 无法进行此转换。当你离开数据局部性时，Hadoop HDFS的优势就变成了它的弱点。</p>
            </div>
            <div>
              <img src="/images/p-3/31.png" alt="" className="mx-auto w-full max-w-sm" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-3/32.png" alt="" className="mx-auto w-full max-w-sm" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">云原生</h4>
              <p>Hadoop是为MapReduce计算而设计的，其中数据和计算必须位于同一位置。因此，Hadoop 需要自己的作业调度程序、资源管理器、存储和计算。这与基于容器的架构从根本上不兼容，在容器架构中，一切都是弹性的、轻量级的和多租户的。相比之下，RustFS 诞生于云中，专为通过 Kubernetes 进行容器和编排而设计，使其成为停用传统 HDFS 实例时过渡到的理想技术。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">现代数据就绪</h4>
              <p>Hadoop是专门为机器数据构建的，其中“非结构化数据”是指大型（GiB到TiB大小）的日志文件。当用作真正的非结构化数据发挥作用的通用存储平台时，小对象（KB 到 MB）的普遍存在极大地损害了 Hadoop HDFS，因为名称节点从未设计为以这种方式扩展。RustFS 在任何文件/对象大小（0 到 5 TiB）上都表现出色。</p>
            </div>
            <div>
              <img src="/images/p-3/33.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-3/34.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">开源</h4>
              <p>采用Hadoop的企业是出于对开源技术的偏好。检查能力、不受锁定的自由以及来自数以万计的用户的舒适性具有真正的价值。RustFS 也是 100% 开源的，确保组织在升级体验的同时能够忠于他们的目标。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">简单</h4>
              <p>简单是很难的。这需要工作、纪律，最重要的是承诺。RustFS 的简单性是传奇的，是使我们的软件易于部署、使用、升级和扩展的哲学承诺的结果。即使是Hadoop的粉丝也会告诉你它很复杂。要事半功倍，您需要迁移到 RustFS。简单是很难的。这需要工作、纪律，最重要的是承诺。RustFS 的简单性是传奇的，是使我们的软件易于部署、使用、升级和扩展的哲学承诺的结果。即使是Hadoop的粉丝也会告诉你它很复杂。要事半功倍，您需要迁移到 RustFS。</p>
            </div>
            <div>
              <img src="/images/p-3/35.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto space-y-8 py-12 xl:py-16">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-3/36.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">性能</h4>
              <p>Hadoop因其提供大数据性能的能力而声名鹊起。在十年的大部分时间里，它们都是企业级分析的基准。现在不是了。RustFS已经在多个基准测试中证明，它比Hadoop快得多。这意味着在 Spark、Presto、Flink 和其他现代分析工作负载上具有更好的性能。</p>
            </div>
          </div>
          <div className="flex items-center gap-10 rounded-xl bg-gradient-to-r from-[#ecd9fd] to-[#f0b2d5] p-10">
            <div className="flex-1 dark:text-neutral-700">RustFS的简单性、可管理性、可扩展性、性能，再加上它是为分解世界而构建的，这意味着总拥有成本大大低于Hadoop HDFS的传统甚至现代实现。借助 RustFS，企业可以以更低的价格做更多的事情、连接更多、增长更多——无论是现在还是随着时间的推移。</div>
            <a href="#" className="rounded-lg bg-pink-500 p-4 px-10 text-white ">基准</a>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-16">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">轻</h4>
              <p>RustFS 的服务器二进制文件全部为 45 MB。尽管它很大，但它足够强大，可以运行数据中心，但仍然足够小，可以在边缘舒适地生活。在Hadoop世界中没有这样的选择。这对企业来说意味着您的 S3 应用程序可以随时随地使用相同的 API 访问数据。</p>
            </div>
            <div>
              <img src="/images/p-3/37.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-16">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-3/38.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">弹性</h4>
              <p>RustFS 使用每个对象的内联纠删码来保护数据，这比 HDFS 替代方案效率高得多，后者在复制后出现且从未被采用。此外，RustFS 的 bitrot 检测确保它永远不会读取损坏的数据 - 即时捕获和修复损坏的对象。RustFS 还支持跨区域、主动-主动复制。最后，RustFS 支持一个完整的对象锁定框架，提供法律保留和保留（具有治理和合规模式）。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-16">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">软件定义</h4>
              <p>Hadoop HDFS的继任者不是硬件设备，而是运行在商用硬件上的软件。这就是 RustFS 的本质——软件。与Hadoop HDFS一样，RustFS旨在充分利用商用服务器。凭借利用 NVMe 驱动器和 100 GbE 网络的能力，RustFS 可以缩小数据中心，从而提高运营效率和可管理性。</p>
            </div>
            <div>
              <img src="/images/p-3/39.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-16">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-3/40.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-primary  text-2xl font-bold">安全</h4>
              <p>RustFS 支持多种复杂的服务器端加密方案，以保护数据，无论数据位于何处，无论是在飞行中还是在静止状态。RustFS的 方法确保机密性、完整性和真实性 性能开销可以忽略不计。服务器端和客户端加密 支持使用 AES-256-GCM、ChaCha20-Poly1305 和 AES-CBC， 确保应用程序兼容性。此外，RustFS 支持 行业领先的密钥管理系统 （KMS）。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
