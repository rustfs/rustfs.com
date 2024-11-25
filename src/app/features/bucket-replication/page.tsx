import { RiBuilding2Fill, RiDatabase2Fill, RiDoubleQuotesL, RiFileCopy2Line, RiFolderLockLine, RiHourglass2Fill, RiNotificationBadgeLine, RiShareForward2Line, RiSpeedUpFill } from "@remixicon/react";

/* eslint-disable @next/next/no-img-element */
export default function Copy() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-9.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center">
          <h1 className="text-5xl font-bold">用于对象存储的多站点、主动活动复制</h1>
          <p className="mt-4 text-lg">
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto py-12">
          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <h2 className="text-2xl font-bold"><RiDoubleQuotesL />对象存储的主动复制是任务关键 型生产环境的关键要求。RustFS是目前唯一提供这种服务的供应商。以存储桶级粒度执行，用于以下情况：</h2>
              <p>RustFS 支持同步和近乎同步的复制，具体取决于架构选择和数据的变化率。在上述每种情况下，复制都必须尽可能接近严格一致（考虑到带宽注意事项和更改率）。</p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-6/s6-1.png" alt="" className="mx-auto max-w-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-6 bg-gray-100 p-12 leading-loose">
          <h2 className="text-center text-3xl font-bold">RustFS 的数据复制专为大规模弹性而设计。主要功能包括：</h2>
          <div className="grid space-y-2 lg:grid-cols-2">
            <div className="flex items-center gap-4">
              <span className="inline-block size-3 rounded-full bg-red-500"></span>
              <span>加密或未加密的对象及其关联的元数据（以原子方式与对象一起写入）</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-block size-3 rounded-full bg-red-500"></span>
              <span>对象版本。</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-block size-3 rounded-full bg-red-500"></span>
              <span>对象标签（如果有）。</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-block size-3 rounded-full bg-red-500"></span>
              <span>S3 对象锁定保留信息（如果有）。</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-6 p-12 leading-loose">
          <h2 className="text-center text-3xl font-bold">RustFS 的数据复制专为大规模弹性而设计。主要功能包括：</h2>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col items-center gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-center rounded-full bg-neutral-50 p-4"><RiShareForward2Line className="size-12" /></div>
              <div>源存储桶和目标存储桶具有相同名称的能力。对于必须透明地故障转移到远程站点而不会造成任何中断的应用程序，这是必需的。</div>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-center rounded-full bg-neutral-50 p-4"><RiFolderLockLine className="size-12" /></div>
              <div>本机支持跨源和目标的自动对象锁定/保留复制。</div>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-center rounded-full bg-neutral-50 p-4"><RiFileCopy2Line className="size-12" /></div>
              <div>近乎同步的复制，可在存储桶发生任何突变后立即更新对象。RustFS 遵循数据中心内的严格一致性和数据中心之间的最终一div护数据。</div>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-center rounded-full bg-neutral-50 p-4"><RiNotificationBadgeLine className="size-12" /></div>
              <div>用于推送复制失败事件的通知功能。应用程序可以订阅这些事件并提醒运营团队。</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          {/* Standard Boxes Section */}
          <div className="container mx-auto space-y-12 p-12 leading-loose">
            <div className="space-y-6">
              <h2 className="text-primary text-center text-4xl font-bold">实施 RustFS的主动-主动复制时要考虑的事项</h2>
              <p className="text-center  text-xl text-neutral-800">
                在最基本的层面上，任何设计都需要考虑基础设施、带宽、延迟、<br />
                弹性和规模。让我们按顺序检查它们：
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                  <RiDatabase2Fill className="size-6 text-blue-400" />
                  <h4 className="text-primary text-2xl font-bold">基础设置</h4>
                </div>
                <div>RustFS 建议在复制端点的两端使用相同的硬件。虽然类似的硬件可以运行，但引入异构硬件配置文件会带来复杂性并减慢问题识别速度。</div>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                  <RiSpeedUpFill className="size-6 text-blue-400" />
                  <h4 className="text-primary text-2xl font-bold">带宽</h4>
                </div>
                <div>带宽是使两个站点始终保持同步的重要因素。站点之间的最佳带宽要求由传入数据的速率决定。具体而言，如果带宽不足以处理峰值，则更改将排队到远程站点，并最终同步。</div>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                  <RiHourglass2Fill className="size-6 text-blue-400" />
                  <h4 className="text-primary text-2xl font-bold">延迟</h4>
                </div>
                <div>在带宽之后，延迟是设计主动-主动模型时最重要的考虑因素。延迟表示两个 RustFS 集群之间的往返时间 （RTT）。目标是在带宽施加的预算限制范围内将延迟降低到尽可能小的数字。RustFS 建议以太网链路和网络的 RTT 阈值不超过 20 毫秒，丢包率不超过 0.01%。</div>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                  <RiBuilding2Fill className="size-6 text-blue-400" />
                  <h4 className="text-primary text-2xl font-bold">建筑</h4>
                </div>
                <div>目前，RustFS 仅建议跨两个数据中心进行复制。可以跨多个数据中心进行复制，但是，所涉及的复杂性和所需的权衡使得这相当困难。</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-12 p-12 leading-loose">
          <div className="space-y-6">
            <h2 className="text-primary text-center text-4xl font-bold">RustFS 支持在每个数据中心进行非常大的部署，<br /> 包括源和目标， 上述考虑因素将决定规模。</h2>
            <div className="rounded-xl border p-8 shadow">
              <img src="/images/s-6/s6-2.png" alt="" className="mx-auto max-w-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-12 p-12 leading-loose">
          <div className="space-y-6">
            <h2 className="text-primary text-center text-4xl font-bold">常见问题</h2>
            <div className="divide-y">
              <div className="space-y-4 py-6">
                <h4 className="text-primary text-xl font-bold">当复制目标出现故障时会发生什么情况？</h4>
                <p>如果目标关闭，源将缓存更改，并在复制目标恢复后开始同步。达到完全同步可能会有一些延迟，具体取决于时间长度、更改次数、带宽和延迟。</p>
              </div>
              <div className="space-y-4 py-6">
                <h4 className="text-primary text-xl font-bold">不变性的参数是什么？</h4>
                <p>支持不可变性。关键概念可以在这篇文章中找到。在主动-主动复制模式下，仅当对象进行版本控制时，才能保证不可变性。无法在源上禁用版本控制。如果目标上的版本控制暂停，RustFS 将开始复制失败。</p>
              </div>
              <div className="space-y-4 py-6">
                <h4 className="text-primary text-xl font-bold">如果版本控制被暂停或出现不匹配，还有什么其他影响？</h4>
                <p>在这些情况下，复制可能会失败。例如，如果您尝试在源存储桶上禁用版本控制，则会返回错误。您必须先删除复制配置，然后才能在源存储桶上禁用版本控制。此外，如果在目标存储桶上禁用版本控制，复制将失败。</p>
              </div>
              <div className="space-y-4 py-6">
                <h4 className="text-primary text-xl font-bold">如果两端都未启用对象锁定，如何处理它？</h4>
                <p>必须在源和目标上启用对象锁定。有一种极端情况，即在设置存储桶复制后，可以删除并重新创建目标存储桶，但未启用对象锁定，复制可能会失败。如果两端未配置对象锁定设置，则可能会出现不一致的情况。在这种情况下，RustFS 将以静默方式失败。</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div >
  )
}
