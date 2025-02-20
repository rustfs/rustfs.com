
import withMetadata from "@/utils/metadata";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react";
import { Metadata } from "next";

export const metadata: Metadata = withMetadata({
  title: '关于我们',
})

/* eslint-disable @next/next/no-img-element */
export default function Pricing() {
  return (
    <>
      <div className="leading-loose">
        {/* Background Banner Section */}
        <div className="relative bg-cover bg-bottom bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/about/banner.png)' }}>
          <div className="mx-auto flex max-w-screen-xl flex-col items-center space-y-6 py-28 xl:pt-52">
            <div className="w-full items-center gap-6 lg:flex">
              <h3 className="w-1/3 text-5xl font-bold">关于我们</h3>
              <div className="space-y-4 lg:space-y-10">
                <p className="text-xl font-bold">
                  RustFS立志成为一家世界领先的数据安全和数据降本公司。
                </p>
                <p>
                  由百度、腾讯、好未来等公司的优秀存储架构师组成的一个开源存储组织（北京恒河沙科技有限公司）。北京恒河沙总部位于中国北京。公司秉承的价值观是：诚信、 专注、简单。
                </p>
                <p>我们的愿景是我们将会向全世界提供多语言的安全、降本的分布式对象存储产品。</p>
                <p>RustFS不断的在人工智能、大数据、视频、云计算、加密存储、工业生产、云原生、数据备份等全方面保障数据安全和降低数据存储成本。</p>
                <p>帮助人类的全球化存储，在路上... ...</p>
              </div>
            </div>
          </div>
        </div>


        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-10 py-12 xl:py-24">
            <h3 className="text-primary mb-10 text-center text-3xl font-bold">我们的愿景和价值观</h3>
            <div className="space-y-12">
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 xl:gap-12">
                <div className="space-y-20 px-12">
                  <div className="relative h-32 text-2xl">
                    <div className="dark:bg-muted absolute bottom-0 left-0 z-0 -m-12 size-48 rounded-full bg-neutral-50"></div>
                    <div className="relative z-10 space-y-4 pl-24">
                      <h2 className="text-8xl font-extrabold text-slate-200">愿景</h2>
                      <div>让全人类的数据安全和降本</div>
                    </div>
                  </div>
                  <div className="relative h-32 text-2xl">
                    <div className="dark:bg-muted absolute bottom-0 left-0 z-0 -m-12 size-48 rounded-full bg-neutral-50"></div>
                    <div className="relative z-10 space-y-4 pl-24">
                      <h2 className="text-8xl font-extrabold text-slate-200">价值观</h2>
                      <div>诚信、 专注、简单</div>
                    </div>
                  </div>
                </div>

                <div>
                  <img src="/images/about/sec-3.png" alt="" className="mx-auto max-w-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-10 py-12 xl:py-24">
            <div className="space-y-12">
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 xl:gap-12">
                <div className="space-y-20 px-12">
                  <h3 className="text-primary mb-10 text-center text-3xl font-bold">办公地址</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <RiMapPinLine className="size-8 text-blue-500" />
                      <div>北京市海淀区西小口路66号中关村东升科技园北领地C区</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiPhoneLine className="size-8 text-blue-500" />
                      <div>电话：400-033-5363</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiMailLine className="size-8 text-blue-500" />
                      <div>邮箱：hello@rustfs.com</div>
                    </div>
                  </div>
                </div>

                <div>
                  <img src="/images/about/sec-3-1.png" alt="" className="mx-auto max-w-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-primary relative bg-cover bg-bottom bg-no-repeat" style={{ backgroundImage: 'url(/images/about/banner-bj.png)' }}>
          <div className="mx-auto max-w-screen-xl">
            <div className="container mx-auto space-y-10 py-12 xl:py-24">
              <div className="space-y-12">
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 xl:gap-12">
                  <div className="space-y-4">
                    <img src="/images/about/sec-4.png" alt="" className="mx-auto max-w-xl" />
                    <p className="text-muted-foreground text-xs">根据Fortune Business Insights的报告，全球数据存储市场预计将从2024年的2183.3亿美元增长到2032年的7740亿美元，在此期间的年复合增长率为17.1%</p>
                  </div>
                  <div className="space-y-20 px-12">
                    <h3 className="text-primary mb-10 text-4xl font-bold text-white">RustFS 为全球提供安全、 可靠的分布式存储方案</h3>
                    <div className="space-y-4">
                      <div className="text-xl font-bold text-pink-500">投资RustFS</div>
                      <div className="flex items-center gap-2">
                        <RiMailLine className="size-8 text-blue-500" />
                        <div className="text-white">联系：hello@rustfs.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
