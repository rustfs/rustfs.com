import { RiDownloadLine } from "@remixicon/react";
import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '商标下载及使用',
})

/* eslint-disable @next/next/no-img-element */
export default function Pricing() {
  return (
    <>
      <div className="bg-muted leading-loose">
        {/* Background Banner Section */}
        <div className="relative bg-cover bg-bottom bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/trademark/banner.png)' }}>
          <div className="mx-auto max-w-screen-xl space-y-6 py-28">
            <h1 className="text-center text-5xl font-bold">商标下载及使用</h1>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-10 py-12">
            <p>此页面中的所有图片只供您在您的产品架构图或者支持列表中用于代表 RustFS 时使用。使用图片时，请标明图片来源为RustFS 官方网站。图片可以按比例调整大小，但不能以任何其他方式进行修改。</p>
            <p>RustFS® 和 rustfs logo® 是北京恒河沙科技有限公司在中国获得注册的注册商标。任何人未经RustFS 书面同意，不得使用这些图片作任何其他用途。</p>
            <p>如有其他未尽事宜，请通过电子邮件 <a href="mailto:hello@rustfs.com" className="text-blue-500">hello@rustfs.com</a> 与我们取得联系。</p>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl text-center">
          <div className="container mx-auto space-y-10 py-12">
            <h2 className="text-5xl font-bold">RustFS Logo</h2>
            <div>
              <div className="relative flex items-center justify-center bg-white py-12 xl:py-24">
                <img src="/images/trademark/logo1.svg" alt="" />
                <a href="/images/trademark/logo1.png.zip" className="absolute bottom-0 right-0 p-8 hover:bg-neutral-50"><RiDownloadLine /></a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="relative flex items-center justify-center bg-black py-12 xl:py-24">
                  <img src="/images/trademark/logo2.svg" alt="" />
                  <a href="/images/trademark/logo2.png.zip" className="absolute bottom-0 right-0 p-8 hover:bg-neutral-50"><RiDownloadLine /></a>
                </div>
                <div className="relative flex items-center justify-center bg-slate-200 py-12 xl:py-24">
                  <img src="/images/trademark/logo3.svg" alt="" />
                  <a href="/images/trademark/logo3.png.zip" className="absolute bottom-0 right-0 p-8 hover:bg-neutral-50"><RiDownloadLine /></a>
                </div>
                <div className="relative flex items-center justify-center bg-pink-500 py-12 xl:py-24">
                  <img src="/images/trademark/logo4.svg" alt="" />
                  <a href="/images/trademark/logo4.png.zip" className="absolute bottom-0 right-0 p-8 hover:bg-neutral-50"><RiDownloadLine /></a>
                </div>
              </div>
            </div>
            <div>
              <a href="/images/trademark/logo.zip" className="rounded-lg bg-blue-500 px-8 py-4 text-white">一键全部下载</a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-10 py-12 xl:py-24">
            <img src="/images/trademark/sec-1.svg" alt="" className="mx-auto max-w-5xl" />
          </div>
        </div>

        <div className="bg-background py-4 lg:py-8 xl:py-12">
          <div className="mx-auto max-w-screen-xl">
            <div className="prose dark:prose-dark rounded-lg border p-4 lg:p-8 xl:p-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold">商标使用规范</h3>
                <div className="version">v1.0</div>
              </div>
              <h4 className="text-2xl">引言</h4>

              <p>RustFS 是一种高性能分布式对象存储系统。它是软件定义的，可在行业标准硬件上运行，并且根据 AGPL v3.0 许可证 100% 开源。</p>
              <p>
                本文件概述了 RustFS 项目关于其商标使用的政策。任何 RustFS 商标的使用都必须符合本政策。就本政策而言，“商标”是指 RustFS 的文字标记、服务标记、徽标、商品外观、产品名称、服务、业务和公司名称。
              </p>
              <p>RustFS 商标包括 RustFS、RustFS Stork、RustFS SUBNET、RustFS KES、RustFS Warp、RustFS DMT 和 RustFS Sidekick 等。</p>
              <p>
                作为自由软件精神的坚定信徒和受人尊敬的社区成员，我们希望用户、分销商和其他社区成员能够广泛使用和改进我们的代码，这些代码是根据开源许可证分发的。尽管我们的代码是开源的，但 RustFS
                希望确保其商标仍然是用户对我们的期望的质量和来源的可靠指标。严格执行我们的商标权也非常重要，以便能够保护我们的用户免受使用商标进行欺诈的人的侵害。这意味着，虽然您有相当大的自由来重新分发和修改我们的软件，但即使对于开源软件，您也必须遵守商标法和本政策。平衡这两个相互竞争的利益并非易事。我们依靠我们的用户、客户和社区来帮助我们实现这一平衡。
              </p>

              <h4 className="text-2xl">一般准则</h4>
              <p>RustFS 的商标政策的根本依据是商标的一般规律。</p>
              <p>RustFS 被设计为可供使用和扩展，并且 RustFS 认识到社区成员可能需要某种方式来以某种方式识别 RustFS 产品，但您必须确保消费者不会对它们是否是官方的（意味着得到 RustFS 批准）感到困惑。</p>
              <p>
                您对 RustFS 商标的使用必须始终不会造成混淆。人们应该始终知道他们正在与谁打交道，以及他们下载的软件来自哪里。非 RustFS 制作或正式授权的网站和软件不应直接或间接暗示它们是 RustFS
                制作或正式授权的。
              </p>
              <p>
                如有任何疑惑或需要澄清，请发邮件至
                <a href="">hello@rustfs.com</a>
              </p>
              <h4 className="text-2xl">你可以做什么</h4>
              <p>
                您可以以任何方式将从 https://rustfs.com/download 下载的未修改的官方二进制文件分发给任何人，但须遵守适用法律和许可证的相关条款，而无需获得 RustFS 的任何进一步许可。但是，您不得删除或更改任何
                RustFS 商标。在您的网站或其他材料中，您可以如实声明您提供的软件是 RustFS 的未修改版本，同时牢记本政策文件中详述的有关使用 RustFS 商标的总体准则。我们建议，如果您选择为网站访问者提供下载
                RustFS 二进制文件的机会，您可以通过链接到我们的网站来下载，以帮助确保更快、更可靠的下载。
              </p>
              <p>您可以在营销和其他宣传相关材料中使用 RustFS 商标。这包括表明个人或组织正在运输或销售 RustFS 产品的广告。当然，任何使用 RustFS 商标的行为都必须遵守一项基本要求，即其使用不得造成混淆。</p>
              <p>
                与 RustFS 相关的服务：如果您提供与 RustFS 相关的服务，您可以在描述和宣传您的服务时使用 RustFS 的商标，只要您不违反使用 RustFS 商标的总体准则或做任何可能误导客户认为 RustFS
                与您的组织有任何直接关系的事情。
              </p>
              <p>标志和商品：您可以制作带有 RustFS 标志的 T 恤、桌面壁纸或棒球帽，但只能为您自己和您的朋友（即您不会从他们那里得到任何有价值回报的人）制作。</p>
              <p>您可以使用 RustFS 商标真实地引用和/或链接到未经修改的 RustFS 程序、产品、服务和技术。</p>
              <h4 className="text-2xl">你不能做什么</h4>
              <p>
                1. 您不能将 RustFS 标志放在您商业生产的任何产品上。
                <br />
                2. 您不得修改 RustFS 的商标、缩写其或将其与任何其他符号、文字或图像结合，或将其合并到标语或口号中。
                <br />
                3. 您不得出于任何目的制作 RustFS Logos 的修改版本。
                <br />
                4. 您不得以错误暗示 RustFS 与您的产品或服务有关联、赞助、认可或批准的方式使用 RustFS 商标。
                <br />
                5. 您不得将 RustFS 商标用于任何形式的商业用途，除非此类使用仅限于真实和描述性的引用。
                <br />
                6. 您不能在社交媒体帐户的名称和名称中使用 RustFS 商标。
              </p>
              <p>
                您可以根据开源许可条款修改 RustFS 软件，但不得以任何 RustFS 商标重新分发您的修改。例如，您的产品或网站不适合说“基于 RustFS”。相反，为了完全准确，您应该将其描述为“基于 RustFS 技术”或“包含
                RustFS 源代码”。您还必须更改产品和二进制文件的名称，以减少修改后的软件的用户被误导相信它是原生 RustFS 或与我们关联的可能性。
              </p>
              <h4 className="text-2xl">你需要获得哪些许可</h4>
              <p>如果您计划使用 RustFS 商标作为网站图标，则需要请求许可。</p>
              <p>
                域名：如果您想在域名中包含全部或部分 RustFS 商标，则必须获得 RustFS 的书面许可。在域名中使用 RustFS 商标几乎任何行为都可能让消费者产生混淆，因此违反了 RustFS 商标使用不得造成混淆的总体要求。
              </p>
              <h4 className="text-2xl">如何使用我们的商标</h4>
              <p>
                1. 正确的形式- RustFS 的商标应以其准确的形式使用 - 既不能缩写也不能与任何其他单词组合。
                <br />
                2. 伴随符号- RustFS 商标的首次或最突出提及应伴随一个符号，表明该商标是注册商标（“®”）还是未注册商标（“™”）；
                <br />
                3. 归属声明- 以下声明应出现在使用 RustFS 商标附近的某个地方（至少在同一页面上）：“[商标] 是 RustFS 公司的 [“注册”，如果适用] 商标”；
                <br />
                4. 可区分- 商标应与周围文字区分开来，可以通过大写、斜体、粗体或下划线来区分。
              </p>
              <p>
                您不得更改任何 RustFS
                徽标，除非对其进行缩放。这意味着您不得添加装饰元素、更改颜色、更改比例、扭曲它、添加元素或将其与其他徽标组合。但是，当上下文需要使用黑白图形并且徽标是彩色时，您可以以产生黑白图像的方式复制徽标。
              </p>
              <h4 className="text-2xl">问题</h4>
              <p>RustFS 已尽力使其商标政策尽可能全面。如果您正在考虑使用不受该政策保护的 RustFS 商标，并且不确定该使用是否违反 RustFS 的准则，请通过hello@rustfs.com与我们联系。</p>
              <p>如果 RustFS 随时自行决定您对我们的任何商标的使用违反本政策，我们可能撤销您使用的许可，并且您必须立即停止对该商标的所有使用。</p>
              <p>本政策可能会不时更新。请参阅此页面了解所有更新。</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
