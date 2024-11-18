import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
export default function Versioning() {
  return (
    <div className="space-y-8">
      {/* Background Banner Section */}
      <div className="bg-banner-1 relative">
        <AnimatedGridPattern
          numSquares={300}
          maxOpacity={0.1}
          duration={1}
          repeatDelay={1}
          className={clsx(
            "[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-0 h-[200%] z-10",
          )}
        />
        <div className="relative z-50 px-6 py-16 text-center">
          <h3 className="text-foreground text-5xl font-bold">桶和对象版本控制</h3>
          <p className="mt-4 text-lg">
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto py-12">
          <h3 className="text-foreground mb-4 text-center text-4xl font-bold">
            RustFS 对象存储提供 AWS S3 版本控制兼容性
          </h3>
          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <p>与 SAN 和 NAS 版本控制方法相比，对象级版本控制是一项重大改进。 版本控制不仅提供数据保护，还是对象锁定、不可变性、分层和生命周期管理等强大功能的基础。</p>
              <p>使用 RustFS，对象根据 Amazon 的 S3 结构/实现进行独立版本控制。RustFS为给定对象的每个版本分配一个唯一 ID - 应用程序可以随时指定一个版本 ID 以访问该对象的时间点快照。</p>
              <p>
                版本控制允许用户在同一存储桶中保留一个对象的多个变体，并提供一种机制来保存、检索和恢复存储在存储桶中的每个对象的每个版本，从而消除了对快照的要求 .
                版本控制确保对象在一系列故障中保持可用，包括由应用程序和人为错误引起的故障。
              </p>
              <p>在存储桶级别启用版本控制。 启用后，RustFS会自动为对象创建一个唯一的版本 ID。 同一对象可以有多个版本。</p>
              <p>
                版本控制的主要好处之一是防止意外覆盖或删除。 这是使用删除标记的概念执行的。 删除版本化对象时，它不会永久删除。 而是创建一个删除标记并成为对象的当前版本。 当请求该对象时，RustFS返回 404
                Not Found 消息。 可以通过删除删除标记来恢复对象。
              </p>
              <p>同理，如果版本化对象被覆盖，RustFS会创建一个新版本并成为当前版本。 同样，可以根据需要恢复旧版本。</p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-8/s8-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto my-12">
          <h3 className="text-foreground mb-4 text-center text-4xl font-bold">RustFS支持具有三种不同存储桶状态的对象版本控制</h3>
          <div className="my-12 flex flex-wrap items-center">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-8/s8-2.png" alt="" className="mx-auto h-full object-scale-down" />
            </div>
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <p>请注意，一旦为存储桶启用了版本控制，该操作就无法撤消 - 只能暂停。 版本控制是存储桶中的全局设置 - 这意味着所有对象现在都已进行版本控制。</p>
              <p>具有适当权限的用户可以暂停版本控制以停止累积对象版本。 与启用版本控制类似，此操作在存储桶级别执行。</p>
              <p>与所有RustFS一样，可以使用RustFS控制台、客户端 (mc)、SDK 或通过命令行应用版本控制。</p>
              <p>
                版本控制是保护数据免受意外操作影响的最简单方法。 但是，随着对象的版本化，它会导致更大的桶大小，并可能导致对象之间更多的相互依赖性以及隐藏对象依赖性的风险。
                这些因素可以通过生命周期管理来缓解。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container rounded-xl bg-gray-100 px-6 py-8 xl:p-12">
          <h4 className="mx-auto mb-4 w-2/3 text-center text-3xl font-bold">
            除了其数据保护优势外，RustFS的对象存储版本控制还是其他关键功能的基础，包括：
          </h4>
          <ul className="grid list-inside list-disc grid-cols-2 space-y-2">
            <li>桶复制（主动-主动，主动-被动）</li>
            <li>Mc undo - 使用单个命令回滚 PUT/DELETE 对象</li>
            <li>对象锁</li>
            <li>类似持续数据保护的保护，无需快照或完整复制系统的开销</li>
            <li>Mc rewind - 在启用版本控制后的任何时间点查看存储桶或对象</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto py-8">
          <h3 className="mb-6 text-center text-4xl font-bold">架构</h3>
          <div className="mb-8 flex justify-center rounded-xl border p-8">
            <img src="/images/s-8/s8-3.png" alt="架构" className="w-full max-w-full" />
          </div>
          <p className="text-center text-base">
            版本控制必须要求： 纠删码和至少四个磁盘。
          </p>
        </div>
      </div>
    </div >
  )
}
