import Marquee from "@/components/ui/marquee";

/* eslint-disable @next/next/no-img-element */
export default function AI() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-bg/banner-2.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center">
          <h1 className="text-5xl font-bold">AI 革命由 GPU <br />和高性能对象存储提供支持。</h1>
          <p className="mt-4 text-lg">
            我们是高性能对象存储
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">AI存储实现大规模性能</h4>
              <p>RustFS 通过利用其分布式 架构和对象存储功能。在模型训练期间， RustFS 的分布式设置允许并行数据访问和 I/O 操作，减少延迟并加快训练时间。对于型号 RustFS的高通量数据访问确保了快速检索和 部署为 AI 模型存储的数据，并通过以下方式实现预测 最小的延迟。更重要的是，RustFS的性能是线性扩展的 从 100 TB 到 100 PB 甚至更多。这优化了 端到端的 AI 工作流程，增强模型开发和服务， 带来更高效的 AI 工作负载和更快的响应速度 应用。</p>
            </div>
            <div>
              <img src="/images/p-2/item12.png" alt="" className="mx-auto w-full max-w-lg" />
            </div>
          </div>
        </div>


        <div className="container mx-auto py-12 xl:py-24">
          <div className="text-center">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">人工智能生态系统的核心</h4>
              <p>RustFS 是 AI 工作负载的 S3 兼容对象存储的标准。 这种无处不在意味着 AI/ML 生态系统都与 RustFS 集成。 不要相信我们的话， 进入你最喜欢的框架，让 谷歌为您提供了证据。</p>
            </div>
            <div className="py-8">
              <div className="bg-background relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                  <img src="/images/p-1/multi-engine-1.svg" alt="" />
                  <img src="/images/p-1/multi-engine-1.svg" alt="" />
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                  <img src="/images/p-1/multi-engine-2.svg" alt="" />
                  <img src="/images/p-1/multi-engine-2.svg" alt="" />
                </Marquee>
                <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
                <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">训练和推理所需的规模</h4>
              <p>企业不断收集和存储 AI 数据 应用程序和大型语言模型可以使用此数据进行重新训练 模型以提高准确性。RustFS 的可扩展性允许 组织按需扩展其存储容量，确保 流畅的数据访问和高性能计算，对于 AI/ML应用的成功。</p>
            </div>
            <div>
              <img src="/images/p-2/item13.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-2/item14.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">弹性（容错）AI 存储</h4>
              <p>RustFS 允许组织存储大量数据，包括 在容错中训练数据集、模型和中间结果 方式。这种弹性对于 ML 和 AI 存储至关重要，因为它 确保数据始终可访问，即使在硬件的情况下也是如此 故障或系统崩溃。借助 RustFS 的分布式架构和 数据复制能力，AI/ML工作流程可以无缝运行 并继续提供准确的见解和预测，增强 AI 驱动应用程序的整体可靠性。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">适用于 AI 工作负载的可靠 （Always On） 存储</h4>
              <p>RustFS 的主动-主动复制功能支持同时访问跨 多个地理位置分散的集群。这对于 AI/ML，因为它增强了数据可用性和性能。人工智能/机器学习 工作负载通常涉及全球协作的团队，并且需要 低延迟访问存储用于 AI 模型训练和推理的数据 - 确保可以从最近的集群位置访问数据， 减少延迟。此外，它还提供故障转移功能， 即使在集群中也能提供对数据的不间断访问 故障，这对于保持可靠性和 AI/ML 流程的连续性。</p>
            </div>
            <div>
              <img src="/images/p-2/item13.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-2/item15.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">适用于大型语言模型的存储解决方案</h4>
              <p>RustFS 可以与大型语言模型 （LLM） 无缝集成，因为 可靠且可扩展的存储解决方案，适用于此类模型所需的海量数据。组织 可以将 RustFS 存储用于预训练的 LLM、微调数据集和其他 工件。这确保了在模型训练期间易于访问和检索 和模特服务。RustFS 的分布式特性允许并行 数据访问，减少数据传输瓶颈并加速 LLM 训练和推理，使数据科学家和开发人员能够 充分利用大型语言模型的潜力，实现自然 语言处理任务。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">用于检索增强生成的上下文存储</h4>
              <p>RustFS 可用作 AI 模型的高性能对象存储后端，用于检索增强生成 （RAG） 和 数据。在 RAG 设置中，RustFS 可以存储用于 从大型语言模型 （LLM） 创建特定于域的响应。一 支持 AI 的应用程序可以访问语料库并为 结果是更符合上下文的相关性和准确的响应 自然语言生成任务，提升整体质量 生成的内容。</p>
            </div>
            <div>
              <img src="/images/p-2/item16.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-2/item17.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">云作为运营模式 - 从 S3 开始</h4>
              <p>RustFS坚持云运营模式——容器化， 编排、自动化、API 和 S3 兼容性。这允许跨云和 通过提供用于存储和访问的统一接口来存储和访问云类型 数据。由于大多数 AI/ML 框架和应用程序都旨在工作 使用 S3 API，在业界具有最佳兼容性至关重要。 拥有超过 13 亿个 Docker 拉取 - 没有对象存储 有更多的开发人员和应用程序验证其兼容性 - 24/7/365. 这种兼容性可确保 AI 工作负载可以访问和 利用存储在 RustFS 对象存储中的数据，而不管底层如何 云基础架构，促进灵活且不可知的数据方法 跨不同云环境的管理和处理。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">边缘 AI 存储</h4>
              <p>在边缘，网络延迟、数据丢失和软件膨胀会降低 性能。RustFS 是世界上最快的对象存储，小于 二进制文件为 100 MB，可以部署在任何硬件上。此外 RustFS Bucket Notifications 和 Object Lambda 等功能可以轻松实现 用于构建可以立即跨新系统运行推理的系统 引入的数据。无论是机载物体检测 高空无人机或交通轨迹预测 自动驾驶汽车，RustFS 的 AI 存储可实现关键任务 应用程序以快速的方式存储和使用其数据， 容错，简单。</p>
            </div>
            <div>
              <img src="/images/p-2/item18.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-2/item19.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">ML/AI 工作负载的生命周期管理</h4>
              <p>现代 AI/ML 工作负载需要复杂的生命周期管理。RustFS 的生命周期管理功能可自动执行数据管理 任务，优化存储效率并减少运营开销。 借助生命周期策略，组织可以自动移动 将不经常访问的 AI 数据转移到成本较低的存储层，从而释放空间 为更关键和更活跃的工作负载提供宝贵的资源。这些 功能确保 AI/ML 从业者可以专注于模型训练和 开发，而 RustFS 智能管理数据，增强整体 工作流程性能和成本效益。此外，生命周期 管理层通过强制执行保留和 删除策略，确保 AI/ML 数据集符合法规要求 要求。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">AI/ML 工作流的对象保留</h4>
              <p>与 AI/ML 相比，更少的工作负载更多地依赖于何时发生的情况。 通过高级对象保留功能解决了这个问题，这些功能可确保存储数据的完整性和合规性 随着时间的流逝。通过实施保留策略，RustFS 可以帮助组织 维护 AI/ML 模型和数据集的数据一致性，防止 意外或未经授权的删除或修改。此功能是 对于数据治理、法规遵从性和 AI/ML 实验的可重复性，因为它保证了关键的 数据在特定持续时间内保持可访问且不变， 支持精确的模型训练和分析。</p>
            </div>
            <div>
              <img src="/images/p-2/item20.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-2/item21.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">
                核心 AI 数据集的数据保护</h4>
              <p>RustFS 通过 不同功能的数量。它支持纠删码和站点复制，确保数据冗余和容错，以防止 硬件故障或数据损坏。RustFS 还允许静态和传输中的数据加密，从而保护数据免受未经授权的访问。此外，RustFS 的 对身份和访问管理 （IAM） 的支持使组织能够控制对其为 AI 存储的数据的访问 工作负载，确保只有授权用户或应用程序才能 访问和修改数据。这些全面的数据保护 RustFS 提供的机制有助于维护完整性、可用性、 以及 AI 数据集在其整个生命周期中的机密性。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
