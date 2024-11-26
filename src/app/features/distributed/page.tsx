import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '大规模数据的基础设施',
  description: 'RustFS 专为扩展而设计。技术规模、运营规模和经济规模。基础规模。'
})

/* eslint-disable @next/next/no-img-element */
export default function Distributed() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-2.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center text-white">
          <h3 className="text-5xl font-bold">大规模数据的基础设施</h3>
          <p className="mt-4 text-lg">
            RustFS 专为扩展而设计。技术规模、运营规模和经济
            规模。基础规模。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl py-12">
        <div className="container mx-auto my-12 flex flex-col gap-8">
          <p>
            RustFS 被设计为云原生，可以作为由 Kubernetes 等外部编排服务管理的轻量级容器运行。整个服务器是一个 ~100MB 的静态二进制文件，即使在高负载下也能高效地使用 CPU 和内存资源。结果是，你可以在共享硬件上共同托管大量租户。
          </p>
          <p className="rounded-lg border bg-white p-4 shadow lg:p-8">
            <img src="/images/s-2/s2-1.png" alt="" className="mx-auto w-full max-w-5xl" />
          </p>
          <p>
            RustFS 可以在任何地方和任何云上运行，但通常在具有本地连接驱动器 （JBOD/JBOF） 的商用服务器上运行。群集中的所有服务器在功能上都是相等的（完全对称的体系结构）。没有名称节点或元数据服务器。
          </p>
          <p>
            RustFS 将数据和元数据作为对象一起写入，无需元数据数据库。此外，RustFS 将所有功能（纠缠码、bitrot 检查、加密）作为内联、严格一致的操作执行。其结果是，RustFS具有非凡的弹性。
          </p>
          <p>每个 RustFS 集群都是分布式 RustFS服务器的集合，每个节点有一个进程。RustFS 在用户空间中作为单个进程运行，并使用轻量级协程实现高并发。驱动器被分组到纠删集中（请参阅此处的纠除计算器），并使用确定性哈希算法将对象放置在这些集上。</p>
          <p>RustFS专为大规模、多数据中心云存储服务而设计。每个租户都运行自己的RustFS 集群，与其他租户完全隔离，使他们能够保护他们免受升级、更新和安全事件的任何中断。每个租户通过跨地理位置联合群集来独立缩放。
          </p>
        </div>
      </div>
    </div>
  )
}
