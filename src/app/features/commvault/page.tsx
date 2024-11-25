
/* eslint-disable @next/next/no-img-element */
export default function Commvault() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary-foreground relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-bg/banner-7.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <img src="/images/p-7/kw.png" alt="" className="mx-auto w-auto max-w-20" />
          <h1 className="text-5xl font-bold">用于 Commvault 备份、恢复和复制的高性能对象存储</h1>
          <p className="text-lg">
            简单。可 伸缩。快。防勒索软件。换句话说，正是你想要的。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <div className="space-y-12">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-2xl  font-bold text-neutral-800">简单 = 安全。</h4>
                <p>这个世界已经足够复杂了。Commvault 和 RustFS 简化了备份和恢复，以保护您的数据。它适用于从 VM 到 Office 365 的一系列数据源。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-5/51.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-5/52.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-2xl  font-bold text-neutral-800">简单交付规模</h4>
                <p>RustFS 对象存储通过其服务器池方法无缝扩展到 EB 甚至更高。这确保了 Commvault 可以专注于其核心任务，而将其余任务（从硬件异构性到纠删码和位腐保护）留给 RustFS。这意味着企业可以扩展其备份并尽可能多地保护数据。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-2xl  font-bold text-neutral-800">快速备份是一回事，快速恢复是另一回事</h4>
                <p>无论大小，备份和恢复都需要快速进行。RustFS 和 Commvault 能够在单个 32 节点集群中以超过 325 GiB/s 的速度进行读/写，因此可以以曾经被认为不可能的速度从对象存储进行备份和恢复。当您的业务依赖于快速恢复时，市场上没有比这更好的解决方案了。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-5/53.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-5/54.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-2xl  font-bold text-neutral-800">原子能</h4>
                <p>由于 RustFS 以原子方式将元数据与对象数据一起写入，因此不需要外部元数据数据库（大多数情况下为 Cassandra）。这消除了与小物体相关的性能损失。RustFS 可在 Commvault 推荐的对象大小范围内提供性能，有助于快速删除和重复数据删除。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <h4 className="text-2xl  font-bold text-neutral-800">内联且严格一致</h4>
                <p>RustFS 中的数据始终是可读和一致的，因为所有 I/O 都与内联擦除码、bitrot 哈希和加密同步提交。RustFS 提供的 S3 服务可灵活应对繁忙事务中的任何中断或重启。异步 I/O 没有缓存或暂存数据。这保证了所有备份操作的成功。</p>
              </div>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-5/53.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 p-4 lg:p-8 xl:p-12">
                <img src="/images/p-5/54.png" alt="" className="mx-auto w-full max-w-48" />
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-2xl  font-bold text-neutral-800">与硬件无关</h4>
                <p>与 Veeam 一样，RustFS 与软件定义和硬件无关。这种方法为 Veeam 客户在设计系统以适应各种不同的备份用例时提供了巨大的节省和灵活性。</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl space-y-6 py-20">
          {/* <h2 className="text-neutral-800  text-center text-3xl font-bold">RustFS 与 Veeam 合作，将高性能私有 云对象存储添加到 S3 端点产品组合中。</h2> */}
          <div className="text-xl">RustFS 和 Commvault 提供各种软件定义的优化备份解决方案。我们携手合作，在备份环境中添加高性能对象存储作为端点分解计算和存储 ，同时提供卓越的性能、可扩展性和经济性。 RustFS 的单个集群可以用作 VM、Oracle、SAP 和 MS Office 中任何内容的 Commvault 端点。</div>
          <div className="gird-cols-1 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-r from-pink-600 to-purple-500 p-4 text-white lg:p-6 xl:p-8">
              <h4 className="text-2xl font-bold">Veeam Backups for VMware ESXi 使用 RustFS</h4>
              <p>
                使用 Veeam 将虚拟基础架构无缝备份到对象存储，为您提供近乎无限的对象存储容量的灵活性。您可以控制成本和安全性，从而控制数据的访问方式。
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-blue-300 to-blue-600 p-4 text-white lg:p-6 xl:p-8">
              <h4 className="text-2xl font-bold">Veeam Backups for Office 365 使用 RustFS</h4>
              <p>
                使用 Veeam 将虚拟基础架构无缝备份到对象存储，为您提供近乎无限的对象存储容量的灵活性。您可以控制成本和安全性，从而控制数据的访问方式。
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-300 p-4 text-white lg:p-6 xl:p-8">
              <h4 className="text-2xl font-bold">Veeam Backups for SAP HANA 使用 RustFS</h4>
              <p>
                借助 RustFS，面向 SAP HANA 的 Veeam 备份解决方案更快、更安全。
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-red-500 to-orange-700 p-4 text-white lg:p-6 xl:p-8">
              <h4 className="text-2xl font-bold">使用 RustFS 的 Veeam Backups for Oracle</h4>
              <p>
                备份 Oracle 工作负载需要性能、弹性和安全性。使用 RustFS 对象存储优化此任务关键型备份。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
