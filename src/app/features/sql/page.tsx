import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '冷归档',
  description: '利用 RustFS 的强大功能，使用外部表函数和 polybase 在任何云（ 公有云、私有云或边缘云）上运行 SQL Server 2022。'
})

/* eslint-disable @next/next/no-img-element */
export default function ColdArchiving() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="relative bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-bg/banner-4.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h3 className="text-5xl font-bold">运行 SQL Server 2022 Anywhere</h3>
          <p className="text-lg">
            利用 RustFS 的强大功能，使用外部表函数和 polybase 在任何云
            （ 公有云、私有云或边缘云）上运行 SQL Server 2022。
          </p>
        </div>
      </div>


      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <div className="space-y-12">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">任何对任何，所有时间。</h4>
                <p>使用 SQL Server 2022 数据云查询和分析驻留在 RustFS 上的多个数据源。现在，企业可以从任何 SQL Server 实例（在公有云、私有云甚至流边缘实例）中查询驻留在 RustFS 上的数据。这包括 AWS、GCP、Azure、Tanzu、OpenShift、HPE Ezmeral、SUSE Rancher，当然还有传统的裸机部署。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/41.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/42.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">连接到数据，不要移动它。</h4>
                <p>使用外部表，企业可以享受 SQL Server 的全部功能，而不会产生移动数据的成本或协调的挑战。</p>
                <p>Polybase 功能允许用户使用 Transact-SQL 直接从 SQL Server 以及大多数其他数据库安装（如 Oracle、Teradata、MongoDB 等）以及现在的 S3 API 查询数据。RustFS 提供了访问所有超大规模云环境的独特功能。两者（SQL Server 2022 和 RustFS）的结合使企业能够访问数据并从数据孤岛中获取见解，到目前为止，这些孤岛是分段且难以组合的。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">大规模性能 -适用于所有企业数据。</h4>
                <p>借助这项新功能，企业可以对组织的所有数据使用 SQL Server 2022 - 无论它位于何处，也无论数据集有多大。凭借 RustFS 行业领先的性能特征，查询可以针对海量、数 PB 的数据存储运行并快速完成。</p>
                <p>这意味着 SQL Server、RustFS 实例和企业数据的利用率更高。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/43.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/44.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">像您梦寐以求的那样备份和恢复</h4>
                <p>SQL Server 2022 和 RustFS 的核心用例之一是备份和还原。RustFS 支持多种配置，支持多种架构。然而，更重要的是，如果需要恢复，RustFS 行业领先的吞吐量可以将数周缩短为数小时，因为如果备份无法快速恢复，则备份毫无用处。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">安全且可用</h4>
                <p>为了保证正确的数据可供正确的用户使用，必须在这些多云数据湖上进行细粒度的访问控制。</p>
                <p>在授权方面，RustFS 能够与第三方 IDP 集成，确保对对象存储的访问仅限于需要它的人。为了验证这些用户只能访问他们需要的特定资源，RustFS 复杂的基于策略的访问控制 （PBAC） 功能确保这不是事后才想到的。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/45.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/46.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">弹性</h4>
                <p>SQL Server 是企业中使用最广泛的分析工具之一。这使它成为企业中的关键任务应用程序。</p>
                <p>SQL Server 2022 允许将数据持续复制到云或从云复制数据，从而实现灾难恢复功能。与 RustFS 的结合允许快速数据驻留在 NVMe 上，并能够将其分层到任意数量的较慢的层。企业可以使用 Transact-SQL 或 Spark 库读取、写入和处理大数据，从而轻松地将高价值关系数据与非关系型大容量大数据组合和分析。SQL Server 2022 允许将数据持续复制到云或从云复制数据，从而实现灾难恢复功能。与 RustFS 的结合允许快速数据驻留在 NVMe 上，并能够将其分层到任意数量的较慢的层。企业可以使用 Transact-SQL 或 Spark 库读取、写入和处理大数据，从而轻松地将高价值关系数据与非关系型大容量大数据组合和分析。</p>
                <p>RustFS 的主动-主动、多站点、严格一致的复制提供了维持完全云故障的框架，同时保持数据可供 SQL Server 使用。SQL Server 在 Azure 或本地运行的功能提供了类似的功能。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">流式传输边缘</h4>
                <p>通过添加外部表功能，现在企业可以设置流式流管道，将数据保存在 RustFS 上 - 在云中或 prem. SQL Server 可以配置为实时执行对这些数据的查询 - 通过消除批量导入的需要，为 SQL Server 体验添加关键的新维度。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-4/47.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-2/item17.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">云作为运营模式 - 从 S3 开始</h4>
                <p>RustFS坚持云运营模式——容器化， 编排、自动化、API 和 S3 兼容性。这允许跨云和 通过提供用于存储和访问的统一接口来存储和访问云类型 数据。由于大多数 AI/ML 框架和应用程序都旨在工作 使用 S3 API，在业界具有最佳兼容性至关重要。 拥有超过 13 亿个 Docker 拉取 - 没有对象存储 有更多的开发人员和应用程序验证其兼容性 - 24/7/365. 这种兼容性可确保 AI 工作负载可以访问和 利用存储在 RustFS 对象存储中的数据，而不管底层如何 云基础架构，促进灵活且不可知的数据方法 跨不同云环境的管理和处理。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">边缘 AI 存储</h4>
                <p>在边缘，网络延迟、数据丢失和软件膨胀会降低 性能。RustFS 是世界上最快的对象存储，小于 二进制文件为 100 MB，可以部署在任何硬件上。此外 RustFS Bucket Notifications 和 Object Lambda 等功能可以轻松实现 用于构建可以立即跨新系统运行推理的系统 引入的数据。无论是机载物体检测 高空无人机或交通轨迹预测 自动驾驶汽车，RustFS 的 AI 存储可实现关键任务 应用程序以快速的方式存储和使用其数据， 容错，简单。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-2/item18.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-2/item19.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">ML/AI 工作负载的生命周期管理</h4>
                <p>现代 AI/ML 工作负载需要复杂的生命周期管理。RustFS 的生命周期管理功能可自动执行数据管理 任务，优化存储效率并减少运营开销。 借助生命周期策略，组织可以自动移动 将不经常访问的 AI 数据转移到成本较低的存储层，从而释放空间 为更关键和更活跃的工作负载提供宝贵的资源。这些 功能确保 AI/ML 从业者可以专注于模型训练和 开发，而 RustFS 智能管理数据，增强整体 工作流程性能和成本效益。此外，生命周期 管理层通过强制执行保留和 删除策略，确保 AI/ML 数据集符合法规要求 要求。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">AI/ML 工作流的对象保留</h4>
                <p>与 AI/ML 相比，更少的工作负载更多地依赖于何时发生的情况。 通过高级对象保留功能解决了这个问题，这些功能可确保存储数据的完整性和合规性 随着时间的流逝。通过实施保留策略，RustFS 可以帮助组织 维护 AI/ML 模型和数据集的数据一致性，防止 意外或未经授权的删除或修改。此功能是 对于数据治理、法规遵从性和 AI/ML 实验的可重复性，因为它保证了关键的 数据在特定持续时间内保持可访问且不变， 支持精确的模型训练和分析。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-2/item20.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-2/item21.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-primary  text-2xl font-bold">核心 AI 数据集的数据保护</h4>
                <p>RustFS 通过 不同功能的数量。它支持纠删码和站点复制，确保数据冗余和容错，以防止 硬件故障或数据损坏。RustFS 还允许静态和传输中的数据加密，从而保护数据免受未经授权的访问。此外，RustFS 的 对身份和访问管理 （IAM） 的支持使组织能够控制对其为 AI 存储的数据的访问 工作负载，确保只有授权用户或应用程序才能 访问和修改数据。这些全面的数据保护 RustFS 提供的机制有助于维护完整性、可用性、 以及 AI 数据集在其整个生命周期中的机密性。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
