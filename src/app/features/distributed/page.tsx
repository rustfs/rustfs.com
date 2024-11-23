import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
export default function S3Compatibility() {
  return (
    <div>
      {/* Background Banner Section */}
      <div className="bg-banner-1 relative">
        <AnimatedGridPattern
          numSquares={300}
          maxOpacity={0.1}
          duration={1}
          repeatDelay={1}
          className={clsx(
            "[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-0 h-[200%]",
          )}
        />
        <div className="px-6 py-16 text-center">
          <h3 className="text-foreground text-4xl font-bold">大规模数据的基础 基础设施</h3>
          <p className="mt-4 text-lg">
            RustFS 专为扩展而设计。技术规模、运营规模和经济规模。基础规模。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto my-12 flex flex-col gap-8">
          <p>
            RustFS 被设计为云原生，可以作为由 Kubernetes 等外部编排服务管理的轻量级容器运行。整个服务器是一个 ~100MB 的静态二进制文件，即使在高负载下也能高效地使用 CPU 和内存资源。结果是，你可以在共享硬件上共同托管大量租户。
          </p>
          <p className="rounded-lg border p-4 shadow lg:p-8">
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
