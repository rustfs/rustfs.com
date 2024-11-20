import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
export default function Versioning() {
  return (
    <div className="space-y-8 leading-loose">
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
          <h3 className="text-foreground text-5xl font-bold">来自 RustFS 的对象不变性</h3>
          <p className="mt-4 text-lg">
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto py-12">
          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <h2 className="text-2xl font-bold">RustFS和S3 API-专为多云存储而设计</h2>
              <p>RustFS从一开始就将自己确立为AWS S3包容性的标准。 作为S3 API（V2 和 V4）的最早采用者之一，也是唯一专注于 S3 的存储公司之一，RustFS的庞大社区确保没有其他AWS替代方案更兼容。 S3 API是云中事实上的标准，因此，AWS的替代方案必须能够流畅地使用API，才能在不同环境（公有云、私有云、数据中心、多云、混合云和边缘）中运行和互操作。</p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-3/s3-1.png" alt="" className="max-w-sm mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto py-12 space-y-6 leading-loose p-12">
          <h3 className="font-bold text-primary text-xl">对象保留</h3>
          <p>
            对象存储保留规则可确保对象在一段时间内受到 WORM 保护。对象存储保留策略指定在对象版本上设置的保留期，可以显式或通过存储桶默认设置。在存储桶级别设置的默认锁定配置适用于随后创建的对象，并且不追溯适用于之前创建的对象的版本。
          </p>
          <p>使用存储桶默认设置时，将设置以天或年为单位的持续时间，以定义放置在存储桶中的每个对象版本应受到保护的时间长度。放置在存储桶中的新对象将继承为存储桶设置的保护持续时间。</p>
          <p>可以为对象版本显式设置保留期。显式保留期指定对象版本的“保留截止日期”。“保留截止日期”设置存储在对象版本的元数据中，并保护对象版本，直到保留期到期。</p>
          <p>保留期到期后，可以删除对象版本，除非还对对象版本进行了法律保留。</p>
          <p>显式保留模式设置将覆盖默认存储桶设置。</p>
          <p>通过提交新的锁定请求，可以轻松延长保留期。</p>
          <p>在保留框架中，有两种类型的模式用于设置对象和存储桶的保留期.</p>
          <h3 className="font-bold text-primary text-xl">治理模式</h3>
          <p>治理模式用于防止对象被标准用户删除。但是，某些用户需要保留修改保留设置或删除对象所需的权限。这些用户将需要特殊权限，例如 s3：BypassGovernanceRetention 权限和 DeleteObject 权限。</p>
          <h3 className="font-bold text-primary text-xl">合规模式</h3>
          <p>合规模式限制性更强，无法在保留期内撤消。因此，合规性模式可确保任何人（包括 root 用户）都无法在对象保留期内删除对象。</p>
          <h3 className="font-bold text-primary text-xl">法定保留</h3>
          <p>法定保留提供与保留期相同的 WORM 保护，但没有到期日期。这是无限期保留，只能由授权用户删除。</p>
          <p>当对象定义了保留或法定保留策略时，它们将继续进行版本控制。对某个对象版本执行的复制操作不会将保留和法定保留设置从源存储桶转移到目标。</p>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          {/* Standard Boxes Section */}
          <div className="container mx-auto py-12 space-y-6 leading-loose p-12">
            <h2 className="text-3xl font-bold text-center">RustFS 数据不变性达到或超过 Cohasset 认证标准</h2>
            <div className="space-y-8">
              <p>
                对象锁定、保留和合法保留的黄金标准是 Cohasset Associates 的验证。RustFS 的对象存储保留和数据不变性赢得了 Cohasset Associates 的积极评价，特别是在 SEC 规则 17a-4（f）、FINRA 规则 4511 和 CFTC
                法规 1.31 方面。规则 17a-4 对电子数据存储有具体要求，包括记录管理的许多方面，例如经纪自营商记录保留的持续时间、格式、质量、可用性和问责制。
              </p>
              <p>Cohasset Associates评估报告的副本可以完整下载，并在RustFS上存储数据时与相应的监管机构共享。它详细介绍了如何配置 RustFS 以满足要求以及支持对象锁定功能的逻辑。</p>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}
