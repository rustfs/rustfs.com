import { RiAlarmWarningFill, RiCloudFill, RiEarthFill, RiExpandWidthFill, RiIdCardFill, RiNotification3Fill, RiOpenaiFill, RiRecordMailFill, RiSendBackward, RiShieldKeyholeFill } from "@remixicon/react";

/* eslint-disable @next/next/no-img-element */
export default function Integration() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/integration/banner.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <img src="/images/integration/hbr.svg" alt="" className="mx-auto w-auto max-w-48" />
          <h1 className="text-5xl font-bold">与 RustFS 集成</h1>
          <p className="text-lg">
            现代数据堆栈是连接的数据堆栈。浏览我们广泛的集成列表，其中包含相关文档的链接。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-20 py-12 xl:py-24">
          <div className="xl grid grid-cols-1 items-center gap-6 font-bold lg:grid-cols-3 xl:grid-cols-5">
            <a className="flex flex-col items-center justify-center" href="#icon1">
              <RiIdCardFill className="text-blue-500" />
              <span>外部身份提供程序</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon2">
              <RiShieldKeyholeFill className="text-blue-500" />
              <span>外部密钥管理</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon3">
              <RiAlarmWarningFill className="text-blue-500" />
              <span>监视和警报</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon4">
              <RiNotification3Fill className="text-blue-500" />
              <span>通知目标</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon5">
              <RiEarthFill className="text-blue-500" />
              <span>联邦</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon6">
              <RiRecordMailFill className="text-blue-500" />
              <span>配器</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon7">
              <RiExpandWidthFill className="text-blue-500" />
              <span>负载均衡器</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon8">
              <RiCloudFill className="text-blue-500" />
              <span>混合云</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon9">
              <RiOpenaiFill className="text-blue-500" />
              <span>机器学习和大数据</span>
            </a>
            <a className="flex flex-col items-center justify-center" href="#icon10">
              <RiSendBackward className="text-blue-500" />
              <span>备份</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto divide-y py-12 xl:py-24">
            <div className="py-8" id="icon1">
              <h3 className="text-primary text-2xl font-bold">外部身份提供程序</h3>
              <p className="text-muted-foreground">受信任的身份提供程序是单点登录的关键组件。RustFS 通过以下集成支持应用程序和用户身份。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-1-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-1-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-1-3.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon2">
              <h3 className="text-primary text-2xl font-bold">外部密钥管理</h3>
              <p className="text-muted-foreground">密钥管理服务 （KMS） 使你能够轻松创建和管理加密密钥，并在整个组织中集中控制这些密钥的使用。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-2-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-2-2.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon3">
              <h3 className="text-primary text-2xl font-bold">监视和警报</h3>
              <p className="text-muted-foreground">容器和微服务需要持续的事件监控和警报。通过这些集成，密切关注任何云原生应用程序或基础架构。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-3-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-3-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-3-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-3-4.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon4">
              <h3 className="text-primary text-2xl font-bold">通知目标</h3>
              <p className="text-muted-foreground">事件通知是任何系统操作敏锐度的核心。RustFS 记录所有对象操作，用于 lambda 计算、对象搜索、分析和安全审计。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-4-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-4.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-5.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-6.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-7.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-4-8.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon5">
              <h3 className="text-primary text-2xl font-bold">联邦</h3>
              <p className="text-muted-foreground">当分布式部署跨数据中心和地理位置时，需要中央联合身份验证服务。RustFS 与以下内容集成。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-5-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-5-2.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon6">
              <h3 className="text-primary text-2xl font-bold">配器</h3>
              <p className="text-muted-foreground">RustFS 支持现代云原生编排平台，可完全自动化物理资源（CPU、网络和驱动器）的部署和管理。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-6-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-6-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-6-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-6-4.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-6-5.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon7">
              <h3 className="text-primary text-2xl font-bold">负载均衡器</h3>
              <p className="text-muted-foreground">对于面向公众的基础架构，负载均衡器提供以下服务;路由、服务发现、SSL 终止和流量整形。RustFS 与以下内容集成。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-7-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-7-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-7-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-7-4.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-7-5.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-7-6.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon8">
              <h3 className="text-primary text-2xl font-bold">混合云</h3>
              <p className="text-muted-foreground">RustFS 使从本地部署到公有云的现有基础设施看起来像 Amazon S3。此外，它还在公有云前面添加了缓存 CDN 功能，以节省带宽，同时提供高性能。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-8-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-8-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-8-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-8-4.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-8-5.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon9">
              <h3 className="text-primary text-2xl font-bold">机器学习和大数据</h3>
              <p className="text-muted-foreground">现代企业是数据驱动的。RustFS 与领先的分析和机器学习框架进行了原生集成。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-9-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-4.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-5.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-6.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-7.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-8.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-9.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-10.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-11.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-12.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-13.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-14.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-15.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-16.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-17.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-18.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-19.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-9-20.png" alt="" /></li>
              </ul>
            </div>
            <div className="py-8" id="icon10">
              <h3 className="text-primary text-2xl font-bold">备份</h3>
              <p className="text-muted-foreground">使用 AWS S3 API 的对象存储已成为每个现代备份应用程序无处不在的备份目标。RustFS 与 S3 兼容系统集成，包括以下领先供应商（列表很长）。</p>
              <ul className="my-4 grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-6 xl:my-8">
                <li><img src="/images/integration/images/icon-10-1.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-10-2.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-10-3.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-10-4.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-10-5.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-10-6.png" alt="" /></li>
                <li><img src="/images/integration/images/icon-10-7.png" alt="" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
