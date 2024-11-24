import { RiArrowRightLine, RiCheckFill, RiCloudyLine, RiComputerLine, RiDvdAiLine, RiShieldCheckLine, RiWindow2Line } from "@remixicon/react";

/* eslint-disable @next/next/no-img-element */
export default function QuantitativeTrading() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary-foreground relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-bg/banner-8.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h1 className="text-5xl font-bold">量化交易文件存储解决方案</h1>
          <p className="text-lg">
            如果希望进一步了解，我们可以安排 1:1 会议为你介绍和演示
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-20 py-12 xl:py-24">
          <h2 className="text-center text-5xl font-bold">挑战与痛点</h2>
          <div className="gird-cols-1 grid gap-6 lg:grid-cols-2">
            <div className="items-start gap-6 lg:flex lg:min-h-28">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-500 p-2 text-white">
                <RiComputerLine />
              </div>
              <p>
                越来越多的量化交易团队开始使用公有云和混合云方式构建技术平台，存储产品需要适合云环境；
              </p>
            </div>
            <div className="items-start gap-6 lg:flex lg:min-h-28">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-500 p-2 text-white">
                <RiWindow2Line />
              </div>
              <p>
                量化投研中使用的编程语言和数据处理工具繁多，如 Python、R、Java、MATLAB、SAS 等；涉及的数据类型多样，包括 CSV、Parquet、TXT、Excel、HDF 等；平台需要具备存储各类型数据的能力。
              </p>
            </div>
            <div className="items-start gap-6 lg:flex lg:min-h-28">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-500 p-2 text-white">
                <RiDvdAiLine />
              </div>
              <p>
                量化投研中应用到大量机器学习和深度学习任务，对存储系统的吞吐量要求提出了新的挑战；
              </p>
            </div>
            <div className="items-start gap-6 lg:flex lg:min-h-28">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-500 p-2 text-white">
                <RiCloudyLine />
              </div>
              <p>
                Kubernetes 已成为资源编排的主要方案，存储系统需要与 Kubernetes 有良好的结合；
              </p>
            </div>
            <div className="items-start gap-6 lg:flex lg:min-h-28">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-500 p-2 text-white">
                <RiShieldCheckLine />
              </div>
              <p>
                模块化的访问权限控制与知识产权保护，以及数据安全问题是量化研究团队的必备需求。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-20 py-12 xl:py-24">
            <h2 className="text-center text-5xl font-bold">Why RustFS？</h2>
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-green-500 p-1 text-white"><RiCheckFill /></div>
                <div>RustFS 是一款为云环境设计的存储产品，适合在公有云、私有云、混合云架构中部署；</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-green-500 p-1 text-white"><RiCheckFill /></div>
                <div>RustFS 100% 兼容 POSIX，同时提供 HDFS、S3 API 访问方式，适合各类型数据的存储和访问；</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-green-500 p-1 text-white"><RiCheckFill /></div>
                <div>RustFS 的吞吐量可以随访问客户端的增加而线性提升，可为热点数据提供高吞吐访问支持；</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-green-500 p-1 text-white"><RiCheckFill /></div>
                <div>RustFS 提供 Kubernetes CSI Driver 支持，与各种 Kubernetes 发行版和云托管服务兼容；</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-green-500 p-1 text-white"><RiCheckFill /></div>
                <div>RustFS 支持数据传输加密与存储加密，可满足量化机构模块化投研需求，保护数据隐私。</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-20 py-12 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/p-8/81.svg" alt="" className="mx-auto max-w-sm" />
            </div>
            <div className="space-y-6">
              <div>
                <div className="inline-block rounded-sm bg-blue-500 px-2 py-1 text-xs text-white">客户案例</div>
              </div>
              <h3 className="text-primary text-2xl font-bold">乾象投资：基于 RustFS 构建云上量化投研平台</h3>
              <p>
                乾象投资 Metabit Trading 成立于 2018 年，是一家以人工智能为核心的科技型量化投资公司。核心成员毕业于 Stanford、CMU、清北等高校。目前，管理规模已突破 30 亿元人民币。 Metabit 非常重视基础平台的建设，有一支强大的 Research Infrastruc…
              </p>
              <div>
                <a href="#" className="flex items-center gap-2 text-blue-500">阅读 <RiArrowRightLine className="size-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
