import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { RiBrush2Line, RiPuzzleLine, RiRamLine, RiRefreshLine, RiShadowLine } from "@remixicon/react";
import clsx from "clsx";

const questions = [
  {
    question: "开发集群和标准集群有什么区别?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序",
  },
  {
    question: "HCP Vault 支持哪些公共云?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序",
  },
  {
    question: "HCP Vault Secrets 和 HCP Vault 之间有什么区别?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序",
  },
  {
    question: "HCP Vault Secrets 是否会在全球范围内以及发布时在哪些区域提供?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
  },
  {
    question: "我可以混合搭配计划吗?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
  },
  {
    question: "如果我取消订阅会怎样?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
  },
  {
    question: "如何升级我的订阅计划?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
  },
  {
    question: "当我的容量减少时，我的账单会怎样?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
  },
  {
    question: "开发集群和标准集群有什么区别?",
    answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
  },
];

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
          <h3 className="text-foreground text-4xl font-bold">小文件优化</h3>
          <p className="mt-4 text-lg">
            为超高性能工作负载 创建内存对象存储
          </p>
          <p className="mt-4 text-lg">
            利用服务器 DRAM 为需要大量 IOPS 和吞吐量性能 的工作负载创建分布式共享内存池。
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
              <h4 className="text-foreground text-2xl font-bold">背景</h4>
              <p>RustFS小文件优化 非常适合需要 IOPS 和吞吐量性能的工作负载。在现代架构中，这越来越意味着 AI/ML 工作负载。在没有缓存的情况下，I/O 可能成为 GPU 的瓶颈。</p>
              <p>使用企业缓存，可以将包含训练、验证和测试数据集的存储桶保存在内存中，以提供基于</p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-12 py-12 xl:py-24">
            <h2 className="text-foreground text-center text-4xl font-bold">特征</h2>
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

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-12 py-12 xl:py-24">
          <h2 className="text-foreground text-center text-4xl font-bold">小文件优化常见问题解答</h2>
          <div className="mx-auto max-w-6xl">
            <div className="hs-accordion-group">
              {questions.map((q, i) => (
                <div key={i} className="hs-accordion hs-accordion-active:bg-gray-100 dark:hs-accordion-active:bg-white/10 rounded-xl p-6" id={`faq-${i}`}>
                  <button className="hs-accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 rounded-lg pb-3 text-start font-semibold text-gray-800 transition hover:text-gray-500 focus:text-gray-500 focus:outline-none md:text-lg dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls={`faq-${i}`}>
                    {q.question}
                    <svg className="hs-accordion-active:hidden block size-5 shrink-0 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    <svg className="hs-accordion-active:block hidden size-5 shrink-0 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                  </button>
                  <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby={`faq-${i}`}>
                    <p className="text-gray-800 dark:text-neutral-200">
                      {q.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
