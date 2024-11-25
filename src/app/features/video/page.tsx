
/* eslint-disable @next/next/no-img-element */
export default function Video() {
  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary-foreground relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-s/s-13.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h1 className="text-5xl font-bold">视频存储降本解决方案</h1>
          <p className="text-lg">
            通过对象存储和混合云的方式，帮助视频存储实现极剧降本
          </p>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl py-20">
          <h2 className="text-center  text-3xl font-bold text-neutral-800">视频存储的<span className="text-pink-600">痛点</span></h2>

          <div className="flex items-center gap-6 py-12 text-left">
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-13/s13-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
            <div className="mt-6 flex flex-1 flex-col gap-6 text-white">
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-6">
                <img src="/images/solution/1.svg" alt="" />
                <h4 className="text-xl font-medium">存储时间长</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-300 p-6">
                <img src="/images/solution/2.svg" alt="" />
                <h4 className="text-xl font-medium">存储空间占用高</h4>
              </div>
              <div className="flex max-w-sm items-center gap-8 rounded-lg bg-gradient-to-r from-green-500 to-green-300 p-6">
                <img src="/images/solution/3.svg" alt="" />
                <h4 className="text-xl font-medium">不可丢失</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto py-12 xl:py-24">
          <h3 className="mb-10 text-center text-3xl font-bold">解决方案</h3>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/s-13/s13-2.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">前端监控视频可通过三种方式上云</h4>
              <p>汇聚到视频监控平台，热数据存储本地混合云存储阵列或存储网关，全量或部分数据上云，适合于园区、智慧城市等场景。</p>
              <p>直接写入云上RustFS，适合于校区、社区、店铺、家庭等场景。</p>
              <p>通过 服务器 写入 RustFS，通过部署在 e服务器 的视频监控应用，写入 RustFS，适合于校区、社区、园区等场景。</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto space-y-10 py-12 xl:py-24">
          <h3 className="mb-10 text-center text-3xl font-bold">其他优势</h3>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">视频上传自动加密</h4>
              <p>自动加密可以确保视频内容在上传和存储过程中不被未授权的第三方访问，有效防止数据泄露和非法传播。</p>
              <p>随着法律法规的不断完善，个人隐私和数据保护的要求越来越高，自动加密可以帮助平台遵守相关法律法规，降低法律风险。</p>
            </div>
            <div>
              <img src="/images/s-13/s13-3.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div>
              <img src="/images/s-13/s13-4.png" alt="" className="mx-auto w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-2xl  font-bold text-neutral-800">版本保护</h4>
              <p>对于原创视频内容，加密可以防止他人未经许可复制、分发或篡改，保护原创者的知识产权。</p>
              <p>用户上传视频时，如果平台能够提供自动加密服务，这将增强用户对平台的信任感，提升用户满意度。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black bg-cover bg-center bg-no-repeat py-10 xl:py-24" style={{ background: 'url(/images/s-13/banner.png);' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-12 text-center text-white">
          <h5 className="text-4xl font-bold">
            马上联系，获得视频加密和降低成本的方案
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
