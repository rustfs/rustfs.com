import { RiDoubleQuotesL } from "@remixicon/react";
import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '亚马逊云 S3 兼容性',
  description: 'S3包容性是云原生应用的硬性要求。RustFS坚定不移地坚持使用API并拥有数以万计的用户，包括商业用户和社区，RustFS的S3实现是世界上最广泛测试和实施的替代AWS S3。'
})

/* eslint-disable @next/next/no-img-element */
export default function Scalable() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-3.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center text-white">
          <h1 className="text-5xl font-bold">来自 RustFS 的可扩展可升级后的对象不变性</h1>
          <p className="mt-4 text-lg">
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto py-12">
          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <h2 className="text-4xl font-bold"><RiDoubleQuotesL />缩放是一个维度概念，但它有一个真理：简单缩放。 RustFS 致力于构建一个简单、强大且可无缝扩展的对象存储套件。</h2>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <p>RustFS 通过称为服务器池的概念水平扩展（向外扩展）。 服务器池是一种结合了多种技术组件的方法。 每个服务器池都是一组独立的节点，具有自己的计算、网络和存储资源。 在多租户配置中，每个租户都是一组服务器池，它们共享相同的物理基础设施，但在各自的命名空间中彼此完全隔离。 要为现有系统增加容量，只需使用新服务器池的地址更新集群，剩下的由 RustFS 完成。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto py-12">
          <h3 className="text-primary  mb-4 text-center text-4xl font-bold">
            Benefits of RustFS 可扩展对象存储
          </h3>
          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <h3 className="text-primary  text-2xl font-bold">消除再平衡</h3>
              <p>
                再平衡是一种既昂贵又耗时的传统方法。 RustFS 将现有数据保留在其原始池中，而新数据可以安全地流向新池。 这消除了数据存储层长时间处于降级和潜在风险状态而潜在的 TB 或 PB
                数据在网络中移动的重新平衡操作。
              </p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-4/s4-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-4/s4-2.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <h3 className="text-primary  text-2xl font-bold">异构基础设施</h3>
              <p>
                随着时间的推移，所有具有足够大小和寿命的对象存储系统都变得异构，系统中有不同的硬件供应商和配置。 RustFS 允许每个服务器池部署在配置时可用或需要的任何硬件上。 从 RustFS
                的角度来看，唯一的要求是一致的 跨池的纠删码 SLA。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <h3 className="text-primary  text-2xl font-bold">可管理的故障域</h3>
              <p>
                池的概念本质上限制了特定故障域的大小。 使用 RustFS，每个租户都相互隔离，因此对一个租户的更新或升级不会影响任何其他租户。
                在租户内，池本身是隔离的，因此一个池内的任何操作或问题都不会危及或影响其他池。
              </p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-4/s4-3.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}
