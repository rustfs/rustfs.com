import Faq from "@/components/home/faq";
import { RiBrush2Line, RiPuzzleLine, RiRamLine, RiRefreshLine, RiShadowLine } from "@remixicon/react";

/* eslint-disable @next/next/no-img-element */
export default function File() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary-foreground relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-bg/banner-9.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h1 className="text-5xl font-bold">小文件优化</h1>
          <p className="text-lg">为超高性能工作负载 创建内存对象存储</p>
          <p className="text-lg">利用服务器 DRAM 为需要大量 IOPS 和吞吐量性能 的工作负载创建分布式共享内存池。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">

        <div className="container mx-auto py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-9/91.png" alt="" className="mx-auto w-full max-w-sm" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">背景</h4>
              <p>RustFS小文件优化 非常适合需要 IOPS 和吞吐量性能的工作负载。在现代架构中，这越来越意味着 AI/ML 工作负载。在没有缓存的情况下，I/O 可能成为 GPU 的瓶颈。</p>
              <p>使用企业缓存，可以将包含训练、验证和测试数据集的存储桶保存在内存中，以提供基于</p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-12 py-12 xl:py-24">
            <h2 className="text-center  text-4xl font-bold text-neutral-800">特征</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="inline-block rounded-full bg-pink-500 p-4 text-center text-sm text-white">
                  <RiShadowLine className="inline-block" />
                </div>
                <p className="text-muted-foreground leading-loose">RustFS小文件优化专门用于缓存文件对象。<br />
                  如果在现有的对象缓存中找不到某个对象，它将自动检索该对象，将其缓存以供将来的请求使用，并将该对象返回给调用者。</p>
              </div>

              <div className="space-y-8">
                <div className="inline-block rounded-full bg-pink-500 p-4 text-center text-sm text-white">
                  <RiRamLine className="inline-block" />
                </div>
                <p className="text-muted-foreground leading-loose">RustFS的小文件优化，优先使用内容。<br />
                  使用一致性哈希算法将缓存对象数据分散到缓存节点集群（称为对等节点）中。一致性哈希确保可以根据对象的键轻松找到对象。这会导致对象的键值与保存缓存对象的节点之间产生一对一的关系。它还确保节点包含相同数量的数据，这样就不会出现一个节点过载而其他节点空闲的情况。然而，更重要的是，它以这样一种方式分散对象，即如果添加或删除节点，则只需进行最少的改组即可使系统对齐。</p>
              </div>

              <div className="space-y-8">
                <div className="inline-block rounded-full bg-pink-500 p-4 text-center text-sm text-white">
                  <RiBrush2Line className="inline-block" />
                </div>
                <p className="text-muted-foreground leading-loose">RustFS滚动缓存用于内存管理。RustFS使用滚动缓存将缓存的总大小保持在小文件优化配置中指定的限制范围内。如果添加新对象会导致缓存大小超出指定限制，则会根据指示上次请求该对象的时间戳删除一个或多个对象。</p>
              </div>

              <div className="space-y-8">
                <div className="inline-block rounded-full bg-pink-500 p-4 text-center text-sm text-white">
                  <RiRefreshLine className="inline-block" />
                </div>
                <p className="text-muted-foreground leading-loose">自动更新新对象版本。如果缓存对象已更新，则 RustFS对象存储会自动使用新对象版本更新缓存。</p>
              </div>

              <div className="space-y-8">
                <div className="inline-block rounded-full bg-pink-500 p-4 text-center text-sm text-white">
                  <RiPuzzleLine className="inline-block" />
                </div>
                <p className="text-muted-foreground leading-loose">RustFS小文优化 是 RustFS 的幕后扩展。由于 小文件优化 是 RustFS 的扩展，因此开发人员无需学习新的 API。开发人员使用与之前相同的 API。如果请求的对象在缓存中，RustFS 将自动从缓存中获取它。如果某个对象应该是缓存，并且是第一次被请求，那么 RustFS 将从对象存储中获取它，将其返回给调用者，并将其放在缓存中以供后续请求使用。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Faq />
    </div >
  )
}
