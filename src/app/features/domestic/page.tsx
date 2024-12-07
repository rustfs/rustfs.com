import { RiComputerLine, RiPieChart2Line, RiShieldStarLine, RiUDiskLine } from "@remixicon/react";

import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '国产信创和通用机加密套件解决方案',
  description: '全面提供从硬件、操作系统到涉密、加密的全套存储解决方案'
})

/* eslint-disable @next/next/no-img-element */
export default function Demestic() {
  return (
    <div className="leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-10.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center text-white">
          <h1 className="text-5xl font-bold">国产信创和通用机加密套件解决方案</h1>
          <p className="mt-4 text-lg">
            全面提供从硬件、操作系统到涉密、加密的全套存储解决方案
          </p>
        </div>
      </div>

      <div className="bg-muted py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-primary text-3xl font-bold">存储信创实施<span className="text-pink-600">痛点</span></h2>

          <div className="flex items-center gap-6 py-12 text-left">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-11/s11-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
            <div className="mt-6 flex flex-1 flex-col gap-6 text-white">
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-6">
                <img src="/images/solution/1.svg" alt="" />
                <h4 className="text-xl font-medium">信创硬件兼容国产芯片</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-300 p-6">
                <img src="/images/solution/2.svg" alt="" />
                <h4 className="text-xl font-medium">满足性能不衰减</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-green-500 to-green-300 p-6">
                <img src="/images/solution/3.svg" alt="" />
                <h4 className="text-xl font-medium">新存储架构升级</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="text-primary flex flex-col gap-12 py-16 xl:gap-24">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-10 text-center text-3xl font-bold ">
            使用 RustFS 构建信创存储的优势
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="flex flex-col justify-center rounded-lg border p-6 text-center ">
              <div className="mx-auto mb-4 text-pink-500">
                <RiUDiskLine className="size-12" />
              </div>
              <p className="text-xl font-semibold">通过硬件测试</p>
              <p className="mt-2 text-gray-600">在海光、飞腾、鲲鹏等多种国产CPU架构下均完成了可用性测试</p>
            </div>
            <div className="flex flex-col justify-center rounded-lg border p-6 text-center ">
              <div className="mx-auto mb-4 text-pink-500">
                <RiComputerLine className="size-12" />
              </div>
              <p className="text-xl font-semibold">操作系统测试</p>
              <p className="mt-2 text-gray-600">在中科方德、欧拉、统信、麒麟操作系统下性能和稳定性通过国家实验室测评</p>
            </div>
            <div className="flex flex-col justify-center rounded-lg border p-6 text-center ">
              <div className="mx-auto mb-4 text-pink-500">
                <RiPieChart2Line className="size-12" />
              </div>
              <p className="text-xl font-semibold">60%的内资持股</p>
              <p className="mt-2 text-gray-600">RustFS由中国国内的企业持股，并且内资持股超过60%，完全符合信创要求</p>
            </div>
            <div className="flex flex-col justify-center rounded-lg border p-6 text-center ">
              <div className="mx-auto mb-4 text-pink-500">
                <RiShieldStarLine className="size-12" />
              </div>
              <p className="text-xl font-semibold">安全加密</p>
              <p className="mt-2 text-gray-600">在等级保护中，我们支持数据自动加密，符合密评和数据不可被渗 透攻击的特点</p>
            </div>
          </div>
        </div>

        <div className="text-primary mx-auto max-w-screen-xl ">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
            <div>
              <h4 className="text-primary  mb-4 text-2xl font-bold">降低违规风险</h4>
              <p className="text-gray-600">
                防止凭据泄露、消除机密蔓延并阻止未经授权的用户。使用Vault 根据受信任的身份验证访问权限并注入即时凭据。
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/s-11/s11-2.png"
                alt="降低违规风险"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <img
                src="/images/s-11/s11-3.png"
                alt="节省项目上线时间"
                className="w-full"
              />
            </div>
            <div>
              <h4 className="text-primary  mb-4 text-2xl font-bold">节省项目上线时间</h4>
              <p className="text-gray-600">
                软件通过了各种机构的专业测试，不需要再反复调研软件的可用性。
              </p>
              <p className="text-gray-600">
                在产品合规后，立马可以上线，满足安全合规和等级保护的强要求。
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
            <div>
              <h4 className="text-primary  mb-4 text-2xl font-bold">支持国产系统</h4>
              <p className="text-gray-600">
                在大型系统中，我需要适用于各种操作系统，包括麒麟、欧拉、统信、中科方德等，我们都经过了全面的系统化测试，符合相关标准。
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/s-11/s11-4.png"
                alt="支持国产系统"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="bg-black bg-cover bg-center bg-no-repeat py-10 xl:py-24" style={{ background: 'url(/images/s-11/banner.png);' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-12 text-center text-white">
          <h5 className="text-4xl font-bold">
            马上联系，获得国产信创适配的存储解决方案
          </h5>
          <div>
            <a
              href="#"
              className="rounded-lg bg-pink-600 px-6 py-3 text-white shadow-lg hover:bg-pink-700 xl:px-12"
            >
              开始
            </a>
          </div>
        </div>
      </div>

    </div >
  )
}
