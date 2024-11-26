import { RiCloudLine, RiDoorLockLine, RiNodeTree } from "@remixicon/react";
import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '混合/多云对象存储',
  description: '混合/多云架构可实现一致的性能、安全性和经济性。任何关于多云的讨论都需要从一个定义开始。它不仅仅是一个单一的公共云和本地。'
})

/* eslint-disable @next/next/no-img-element */
export default function CloudNative() {
  return (
    <div>
      {/* Background Banner Section */}
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-bg/banner-6.png)' }}>
        <div className="relative z-10 space-y-12 px-6 py-20 text-center text-white">
          <h3 className="text-5xl font-bold">混合/多云对象存储</h3>
          <p className="mt-4 text-lg">混合/多云架构可实现一致的性能、安全性和经济性。<br />任何关于多云的讨论都需要从一个定义开始。
            它不仅仅是一个单一的公共云和本地。</p>
        </div>
      </div>

      <div className="bg-muted">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-12 py-12 xl:py-24">
            <h2 className="text-primary  text-center text-4xl font-bold">成功的多云存储策略利用能够在各种环境中运行的架构和工具。</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <RiCloudLine className="size-8 text-blue-500" />
                  <h3 className="text-2xl font-bold">公有云</h3>
                </div>
                <p className="text-muted-foreground">
                  这是一个越来越大的领域，但从AWS、Azure、GCP、IBM、阿里巴巴、腾讯和政府云开始。您的混合/多云存储软件需要在应用程序堆栈运行的任何位置运行。即使是声称在单个云上运行的公司也没有 - 总有其他云。RustFS 为每个公有云提供商提供存储一致性，避免在扩展到新云时需要重写应用程序。
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <RiDoorLockLine className="size-8 text-blue-500" />
                  <h3 className="text-2xl font-bold">私有云</h3>
                </div>
                <p className="text-muted-foreground">
                  Kubernetes 是现代私有云的主要软件架构。这包括所有 Kubernetes 发行版，例如 VMware （Tanzu）、RedHat （OpenShift）、Rancher/SUSE、HP （Ezmeral） 和 Rafay。多云 Kubernetes 需要软件定义和云原生的对象存储。私有云还包括更传统的裸机实例，但企业工作负载越来越多地被容器化和编排。
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <RiNodeTree className="size-8 text-blue-500" />
                  <h3 className="text-2xl font-bold">边缘</h3>
                </div>
                <p className="text-muted-foreground">
                  边缘是关于将计算移动到生成数据的位置。处理后，数据将移动到更集中的位置。边缘存储解决方案必须轻量级、功能强大、云原生且具有弹性，才能在这种多云架构中运行。要做到这一点非常困难，这就是为什么很少有供应商讨论它，他们没有一个好的答案——即使是亚马逊。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-12 py-12">
          <h2 className="text-primary  text-center text-4xl font-bold">使用 RustFS 的多云架构</h2>
          <div className="">
            <img src="/images/p-6/61.png" alt="" className="mx-auto max-w-lg" />
          </div>
        </div>

        <div className="container mx-auto space-y-12 py-12">
          <h2 className="text-primary  text-center text-4xl font-bold">混合/多云存储的属性</h2>
          <p>多云存储遵循公有云建立的模式，公有云提供商一致采用云原生对象存储。公有云的成功有效地使文件和块存储过时了。每个新应用程序都是为 AWS S3 API 编写的，而不是为 POSIX 编写的。为了像云原生技术一样进行扩展和执行，必须针对 S3 API 重写较旧的应用程序，并将其重构为微服务，以便与容器兼容。</p>
          <div className="flex items-start gap-6">
            <div className="sticky top-8 flex w-[240px] shrink-0 flex-col gap-4 border p-4">
              <a href="#sec1">KubernetesNative</a>
              <a href="#sec2">一致</a>
              <a href="#sec3">性能</a>
              <a href="#sec4">可伸缩</a>
              <a href="#sec5">软件定义</a>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-primary text-2xl font-bold" id="sec1">Kubernetes-Native</h3>
                <p>
                  Kubernetes 原生设计需要运营商服务来配置和管理多租户对象存储即服务基础架构。这些租户中的每一个都在自己的独立命名空间中运行，同时共享基础硬件资源。运算符模式通过自定义资源定义 （CRD） 扩展了
                  Kubernetes 熟悉的声明式 API 模型，以执行资源编排、无中断升级、集群扩展等常见操作，并保持高可用性。
                </p>
                <p>
                  RustFS 专为充分利用 Kubernetes 架构而构建。由于服务器二进制文件快速且轻量级，RustFS Operator 能够在不耗尽资源的情况下密集地共置多个租户。利用 Kubernetes 和相关生态系统的优势，利用便携式
                  Kubernetes 原生存储获得多云优势。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-primary text-2xl font-bold" id="sec2">一致</h3>
                <p>混合/多云存储必须在 API 兼容性、性能、安全性和合规性方面保持一致。它需要一致且独立于底层硬件执行。任何变化，即使是很小的变化，都可能破坏应用程序，从而造成巨大的运营负担。</p>
                <p>
                  由于 RustFS 非常轻量级，我们可以在几分钟内在公共、私有和边缘推出无中断更新，从而保持一致的体验。RustFS 抽象了这些架构之间的基本差异，包括密钥管理、身份管理、访问策略和硬件/操作系统差异。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-primary text-2xl font-bold" id="sec3">性能</h3>
                <p>
                  由于对象存储同时用作主存储和辅助存储，因此它需要大规模提供性能。从移动/Web 应用程序到
                  AI/ML，数据密集型工作负载需要底层对象存储的卓越性能。即使是数据保护工作负载也需要高性能的重复数据消除和快照访问。任何企业都无法承受缓慢的恢复过程。传统上，这些工作负载需要裸机性能。现在，可以将所有这些工作负载容器化
                  - 正如公共云提供商的成功所证明的那样。
                </p>
                <p>
                  RustFS 是世界上最快的对象存储，NVMe 的读/写速度分别为 325 GiB/s 和 171 GiB/s，HDD 的读/写速度分别为 11 GiB/s 和 9
                  GiB/s。在这样的速度下，每个工作负载都可以在任何基础架构上运行的任何多云架构中实现。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-primary text-2xl font-bold" id="sec4">可伸缩</h3>
                <p>
                  许多人认为规模只是指系统可以达到多大。然而，这种想法忽略了随着环境的发展，运营效率的重要性。无论底层环境如何，多云对象存储解决方案都必须高效、透明地扩展，并且只需最少的人机交互和最大的自动化即可实现。这只能通过建立在简单架构之上的
                  API 驱动平台来实现。
                </p>
                <p>RustFS 对简单性的不懈关注意味着可以用最少的人力资源管理大规模、多 PB 的数据基础设施。这是 API 和自动化的功能，并创建了一个环境，可以在其上创建可扩展的多云存储。</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-primary text-2xl font-bold" id="sec5">软件定义</h3>
                <p>
                  在多云中取得成功的唯一方法是使用软件定义的存储。原因很简单。硬件设备不在公有云或 Kubernetes 上运行。公有云存储服务产品并非设计用于在其他公有云、私有云或 Kubernetes
                  平台上运行。即使它们这样做了，带宽的成本也会高于存储成本，因为它们不是为了跨网络复制而开发的。诚然，软件定义存储可以在公有云、私有云和边缘运行。
                </p>
                <p>RustFS 诞生于软件，可跨各种操作系统和硬件架构移植。证据可以在我们跨 AWS、GCP 和 Azure 运行的 2M+ IP 中找到。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
