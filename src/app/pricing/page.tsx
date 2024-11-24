'use client'

import Faq from "@/components/home/faq";
import HomeReviews from "@/components/home/reviews";
import { RiCheckLine, RiPriceTag3Fill, RiServerFill, RiShakeHandsFill, RiUserStarFill } from "@remixicon/react";
import clsx from "clsx";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Pricing() {
  const [tab, setTab] = useState('open-source');

  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary-foreground relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-bg/banner.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h3 className="text-5xl font-bold">RustFS 价格</h3>
          <p className="text-lg">
            {/* 使用 RustFS 扩展您的 v12 实例，并大幅提升 Veeam存储容量和性能。 */}
          </p>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center space-y-6 py-20">
          <div className="text-primary mx-auto flex items-center justify-center rounded-full border border-gray-500 p-2">
            <div className={clsx('p-4 px-6 font-bold text-xl rounded-full', { 'bg-blue-500 text-white': tab == 'open-source' })} onClick={() => setTab('open-source')}>开源版 + 技术支持</div>
            <div className={clsx('p-4 px-6 font-bold text-xl rounded-full', { 'bg-blue-500 text-white': tab !== 'open-source' })} onClick={() => setTab('business')}>商业授版授权(含技术服务)</div>
          </div>
          {/* tabs content */}
          <div className="w-full flex-1 pt-8 xl:pt-16">
            {tab === 'open-source' && (
              <div className="grid w-full grid-cols-1 items-center gap-6 text-center lg:grid-cols-3">
                <div className="flex flex-col items-center justify-center space-y-10 rounded-xl border p-8 shadow-lg xl:p-12">
                  <h4>SLA 48 小时响应服务</h4>
                  <div className="text-2xl font-bold"><span className="text-5xl">9.8</span>万/年</div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-10 rounded-xl border p-8 shadow-lg xl:p-12">
                  <h4>SLA 24 小时响应服务</h4>
                  <div className="text-2xl font-bold"><span className="text-5xl">29.8</span>万/年</div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-10 rounded-xl border p-8 shadow-lg xl:p-12">
                  <h4>SLA 1 小时响应服务</h4>
                  <div className="text-2xl font-bold"><span className="text-5xl">49.8</span>万/年</div>
                </div>
              </div>
            )}
            {tab === 'business' && (
              <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col space-y-10 rounded-xl border border-t-8 border-t-gray-600 p-8 shadow-lg xl:p-12">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-primary text-3xl font-bold">企业菁英版</h4>
                      <div className="flex items-center">
                        <RiPriceTag3Fill />
                        <span>129元/TB/月</span>
                      </div>
                    </div>
                    <div>
                      <div className="inline-block rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white">企业强化版</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xl font-bold">200TB起售</div>
                  <div>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>提供专门的企业安装版安装包</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>提供8小时内的技术响应</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>提供服务门户服务权限</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>所在国家提供一次免费上门服务</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>一次紧急响应服务</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>1年商业授权</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>远程日志和年度审查服务</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>每月进行一次巡检</span>
                    </li>
                  </div>
                </div>
                <div className="flex flex-col space-y-10 rounded-xl border border-t-8 border-t-blue-600 p-8 shadow-lg xl:p-12">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-primary text-3xl font-bold">企业专业版</h4>
                      <div className="flex items-center">
                        <RiPriceTag3Fill />
                        <span>149元/TB/月</span>
                      </div>
                    </div>
                    <div>
                      <div className="inline-block rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white">企业增强版</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xl font-bold">1PB起售</div>
                  <div>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>提供专门的企业安装版安装包</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>提供 1 小时内的技术响应</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>提供服务门户服务权限</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>所在国家提供 3 次免费上门服务</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>一次紧急响应服务</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>1年商业授权</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>远程日志和年度审查服务</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>每月进行一次巡检</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>中国国产信创体系支持</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>国产加密支持</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <RiCheckLine className="text-blue-500" />
                      <span>硬件代采服务</span>
                    </li>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <h3 className="text-primary mb-10 text-center text-3xl font-bold">为什么我们的客户购买RustFS？</h3>
          <div className="space-y-12">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 xl:gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-2xl font-bold text-pink-600">
                  <RiShakeHandsFill className="size-8" />
                  <h5>商业许可</h5>
                </div>
                <div className="text-muted-foreground">
                  业许可证授予额外的权限，而没有与开源许可证相关的许多限制。除了安心的商业许可证之外，订阅者还可以获得与 RustFS 开源理念相关的好处 - 即免于锁定、自由检查以及知道有一个致力于强化产品的庞大社区的安慰。
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-2xl font-bold text-blue-500">
                  <RiUserStarFill className="size-8" />
                  <h5>技术专长</h5>
                </div>
                <div className="text-muted-foreground">
                  团队拥有一套卓越的技术能力，可供商业许可证持有者使用。凭借数十年的软件定义存储经验、多年的合作以及开源模型所要求的严格性，RustFS 可以快速有效地解决客户的技术挑战。 RustFS 采用独特的方法，通过 SUBNET 门户为我们的工程师提供直接、24/7 的访问。这不仅加快了解决时间，而且带来了更广阔的视角——通常可以在问题成为问题之前就将其识别出来。
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-2xl font-bold text-orange-600">
                  <RiServerFill className="size-8" />
                  <h5>生产保障</h5>
                </div>
                <div className="text-muted-foreground">
                  我们的客户订阅该软件的首要原因是他们转向生产。尽管 RustFS 以其性能和简单性而自豪，但 RustFS 的生产部署始终是关键任务，并且涉及许多不同的技术。当我们的客户达到这一点时，如果没有商业关系的保证、我们提供的专业知识、有保证的响应时间以及直接面向工程师的参与模式的效率，RustFS 对于业务的整体健康来说意义重大。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeReviews />

      <div className="bg-neutral-100">
        <Faq />
      </div>
    </div>
  )
}
