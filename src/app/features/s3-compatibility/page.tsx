
/* eslint-disable @next/next/no-img-element */
export default function S3Compatibility() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-1.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center">
          <h1 className="text-5xl font-bold">亚马逊云 S3 兼容性</h1>
          <p className="mt-4 text-lg">
            S3包容性是云原生应用的硬性要求。RustFS坚定不移地坚持使用API并拥有数以万计的用户<br />
            包括商业用户和社区，RustFS的S3实现是世界上最广泛测试和实施的替代AWS S3。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">

        {/* Standard Boxes Section */}
        <div className="container mx-auto my-12">
          <div className="flex flex-wrap items-center">
            <div className="w-full p-6 md:w-1/2">
              <h3 className="mb-4  text-3xl font-bold text-neutral-800">
                RustFS和S3 API-专为多云存储而设计
              </h3>
              <p>
                RustFS从一开始就将自己确立为AWS S3包容性的标准。 作为S3 API（V2 和 V4）的最早采用者之一，也是唯一专注于 S3 的存储公司之一，RustFS的庞大社区确保没有其他AWS替代方案更兼容。
                S3 API是云中事实上的标准，因此，AWS的替代方案必须能够流畅地使用API，才能在不同环境（公有云、私有云、数据中心、多云、混合云和边缘）中运行和互操作。
              </p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-1/s1-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
          </div>

          <div className="my-12 flex flex-wrap items-center">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-1/s1-2.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
            <div className="w-full p-6 md:w-1/2">
              <h3 className="mb-4  text-3xl font-bold text-neutral-800">S3 兼顾混合和多云计算</h3>
              <p>
                实现多云和混合云兼容性只有一条途径，那就是 S3。 作为 RESTful API
                标准，S3 彻底改变了应用程序、数据和基础架构之间的交互。 此外，容器化和 Kubernetes 编排的双重力量也是围绕 RESTful API
                构建的，将 POSIX API 降级为遗留状态。
                <br />
                结果是 Kubernetes 原生、S3 兼容的对象存储和应用程序可以在任何地方运行 - 从各种公共云实例（RustFS 在 Google、Azure 和 AWS 上有近
                100 万个部署）到私有云（红帽 OpenShift，VMware Tanzu)，到裸机。 通过利用先进的 S3 API 驱动的 ILM 技术，企业可以跨云和本地实例执行操作优化的实例
                .
                <br />
                对 Microsoft Azure 的 S3 转换层感兴趣的客户 安装可以购买 RustFS Blob 存储网关 (S3 API) 来自 Azure Marketplace。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="w-full p-6 md:w-1/2">
              <h3 className="mb-4  text-3xl font-bold text-neutral-800">
                裸机工作负载的 S3 包容性
              </h3>
              <p>
                私有云是任何混合云架构的基本构建块。 这意味着，与公共云一样，S3
                的包容性至关重要 - 无论是什么应用程序 - 从分析到人工制品再到归档。
                <br />
                使用 RustFS，S3 包容性完全独立于位置。 这意味着RustFS的裸机本地实例具有与公共云实例甚至边缘实例完全相同的 S3 包容性和性能。
              </p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-1/s1-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto my-12">
          <h3 className="mb-4  text-3xl font-bold text-neutral-800">Benefits of RustFS 可扩展对象存储</h3>
          <p className="mb-4">
            云原生应用程序使用 S3 API 与对象存储进行通信。 但并非所有 S3 的包容性都是相同的——许多对象存储供应商只支持一小部分整体功能——这会导致应用程序失败。
            其他人声称全面覆盖，但他们的专有软件或设备模型限制了这一声称，因为只有一小部分应用程序、硬件和软件经过测试。
          </p>
          <p className="mb-4">
            RustFS的独特之处在于其支持其 S3 兼容性声明的能力。 我们拥有数以万计的客户和开源用户，我们的 S3 API
            兼容性在世界上得到了最广泛的测试和实施——涵盖了数百万种硬件、软件和应用程序组合。
            RustFS每周发布一次软件，S3 API 的任何缺陷都会立即由社区报告并由RustFS纠正。
          </p>
          <p className="mb-4">有传言说，甚至 Amazon 也使用RustFS测试第三方 S3 兼容性。</p>
          <p className="mb-4">
            对 S3 API 最全面的支持意味着应用程序可以在任何硬件、任何位置和任何云上利用存储在RustFS中的数据。 开发人员可以自由创新和迭代，并确信RustFS永远不会破坏版本。
          </p>
        </div>

        {/* Color Boxes Section */}
        <div className="container mx-auto my-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative flex flex-col gap-4 rounded-xl bg-gray-100 bg-gradient-to-b from-[#4242ec] to-[#63ccff] p-6 text-white xl:p-12">
              <h4 className="mb-2 text-2xl font-bold">S3 选择</h4>
              <p className="my-4">
                S3 Select 取决于复杂查询的大规模性能，而RustFS性能特征可以充分利用
                API。 RustFS利用 SIMD 指令集在芯片级优化性能，可以在 CSV、Parquet、JSON
                等上运行大型复杂的 S3 Select 查询。
              </p>
              <img src="/images/s-1/s1-4.png" alt="S3 Select" className="w-full self-end" />
            </div>
            <div className="relative flex flex-col gap-4 rounded-xl bg-gray-100 bg-gradient-to-b from-[#9466ff] to-[#f22ac2] p-6 text-white xl:p-12">
              <h4 className="mb-2 text-2xl font-bold">亚马逊Signature V4</h4>
              <p className="my-4">
                应用程序和客户端必须进行身份验证才能访问任何RustFS管理 API。RustFS是第一个支持 AWS 签名版本
                4（支持已弃用的签名版本 2）的公司。 身份验证后，RustFS使用与 AWS IAM
                策略语法、结构和行为兼容的基于策略的访问控制来授权操作。
              </p>
              <img src="/images/s-1/s1-5.png" alt="Amazon Signature V4" className="w-full self-end" />
            </div>
          </div>
        </div>

        {/* Closing Section */}
        <div className="container mx-auto my-12">
          <h3 className="mb-4 text-center text-3xl font-bold">AWS S3 API 和 RustFS</h3>
          <p className="mb-4">
            RustFS是世界上最快的对象存储。 再加上它的 S3
            包容性，确保它可以运行业内最广泛的用例集。这包括现代应用程序工作负载，例如 GitHub 和 GitLab
            用于代码存储库、现代分析工作负载，例如 MongoDB, Clickhouse，MariaDB, CockroachDB 和
            Teradata 到传统归档 、备份和灾难恢复用例。
          </p>
          <p className="mb-4">
            RustFS的性能特征，结合其 S3 包容性，使其成为 AI/ML 和数据科学工作负载的标准。 KubeFlow 和 TensorFlow
            需要高性能的 S3 兼容对象存储，并且越来越多地首先为 RustFS 而设计，其次是 AWS 或其他云。
            RustFS 为应用程序提供真正的多云对象存储和高效复制。 为 S3 API 编写的应用程序可以在任何地方运行，使开发人员能够在最好的云工具可用时快速创新。
          </p>
        </div>
      </div>
    </div>
  )
}
