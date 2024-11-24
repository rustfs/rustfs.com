import { RiArchiveStackFill, RiHardDriveFill, RiLightbulbFill, RiShieldCrossFill, RiTimeFill } from "@remixicon/react";

/* eslint-disable @next/next/no-img-element */
export default function ColdArchiving() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary-foreground relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-s/s-10.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h1 className="text-5xl font-bold">对象存储冷归档解决方案</h1>
          <p className="text-lg">
            海量机密和重要数据，以光盘为媒介实现数百年的脱网、脱电存储不丢失
          </p>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl py-20">
          <h2 className="text-foreground text-center text-3xl font-bold">冷归档存储<span className="text-pink-600">痛点</span></h2>

          <div className="flex items-center gap-6 py-12 text-left">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-13/s13-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
            <div className="mt-6 flex flex-1 flex-col gap-6 text-white">
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-6">
                <img src="/images/solution/1.svg" alt="" />
                <h4 className="text-xl font-medium">百年存储</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-300 p-6">
                <img src="/images/solution/2.svg" alt="" />
                <h4 className="text-xl font-medium">脱电断网</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-green-500 to-green-300 p-6">
                <img src="/images/solution/3.svg" alt="" />
                <h4 className="text-xl font-medium">安全可靠</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <h3 className="mb-10 text-center text-3xl font-bold">长寿命</h3>
          <p className=" text-center">实现用户数据的长期稳定存储，50-100年内无需数据迁移</p>
          <div>
            <img src="/images/s-10/s10-2.png" alt="" className="mx-auto w-full max-w-7xl" />
          </div>
        </div>

        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <h3 className="text-primary mb-10 text-center text-3xl font-bold">低能耗</h3>
          <p className="text-foreground text-center text-xl">单机柜工作功率160W，待机功率仅7W，大大降低电费投入，绿色节能</p>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-foreground text-2xl font-bold">大中型数据中心能耗测算</h4>
              <p>据估计，一个2000个机架的数据中心一年电费成本5256万元，以PUE为2.0测算时，整体能耗成本高达每年1.05亿元</p>
              <p>蓝光光盘库无需空调降温设备，工作功耗约170W，待机功耗仅为7W，运行环境:发热量低，无需空凋制冷恒温恒湿环境，常温条件运行</p>
              <p className="text-pink-500">同等存储力的蓝光机柜能耗是磁存储机柜的22.6%</p>
            </div>
            <div>
              <img src="/images/s-10/s10-3.png" alt="" className="mx-auto w-full max-w-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto py-12 xl:py-24">
            <h3 className="text-primary mb-10 text-center text-3xl font-bold">产品特征</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="text-primary flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-pink-300 p-2 text-white">
                  <RiArchiveStackFill />
                </div>
                <div>0 人工，支持数据生命周期管理，存量自动归档</div>
              </div>
              <div className="text-primary flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-pink-300 p-2 text-white">
                  <RiShieldCrossFill />
                </div>
                <div>0 篡改 抗电磁干扰、防病毒攻击、防人为篡改</div>
              </div>
              <div className="text-primary flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-pink-300 p-2 text-white">
                  <RiHardDriveFill />
                </div>
                <div>1.915PB 无惧海量数据存储，兼容各种数据类型</div>
              </div>
              <div className="text-primary flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-pink-300 p-2 text-white">
                  <RiLightbulbFill />
                </div>
                <div>80% 低能耗、宽环境，无需空调制冷，绿色环保</div>
              </div>
              <div className="text-primary flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-pink-300 p-2 text-white">
                  <RiTimeFill />
                </div>
                <div>100年 无机相变材料介质，50-100年无需数据迁移</div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="bg-black bg-cover bg-center bg-no-repeat py-10 xl:py-24" style={{ background: 'url(/images/s-13/banner.png);' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-12 text-center text-white">
          <h5 className="text-4xl font-bold">
            马上联系，获得提升百年存储成本优化方案
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
