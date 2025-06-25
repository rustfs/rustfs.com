'use client'

import { useI18n } from "@/lib/i18n";
import FreeChat from "./buttons/free-chat";

export default function HomeMultiClouds() {
  const { tw } = useI18n();

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-neutral-100">
            {tw('真正的多云存储', 'True Multi-Cloud Storage')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-neutral-400">
            {tw('多云对象存储允许企业在任何云上构建与 AWS S3 兼容的数据基础设施。结果是数据和应用程序的一致、可移植的接口 - 这意味着您可以在任何地方运行，从边缘到公共云，而无需更改一行代码。', 'Multi-cloud object storage allows enterprises to build AWS S3-compatible data infrastructure on any cloud. The result is a consistent, portable interface for data and applications - meaning you can run anywhere, from edge to public cloud, without changing a line of code.')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <FreeChat />
            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-neutral-100">
              {tw('联系我们获取更多信息', 'Contact us for more information')} <span aria-hidden="true">→</span>
            </a> */}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-neutral-100">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                {tw('公有云', 'Public Cloud')}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-neutral-400">
                <p className="flex-auto">
                  {tw('RustFS 由 Kubernetes 提供支持，为每个公共云提供可扩展、安全、兼容 S3 的对象存储。将自己从供应商的束缚中解放出来，并对待云的本质 - 商用计算、网络和驱动器。', 'RustFS is powered by Kubernetes and provides scalable, secure, S3-compatible object storage for every public cloud. Free yourself from vendor lock-in and treat clouds for what they are - commodity compute, network, and drives.')}
                </p>

              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-neutral-100">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                {tw('私有云', 'Private Cloud')}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-neutral-400">
                <p className="flex-auto">
                  {tw('从 OpenShift 到 Tanzu，RustFS 是唯一一个作为领先 Kubernetes 发行版基础设施基础部分的对象存储。凭借其庞大的集成应用程序组合 RustFS 完善了软件定义的画面。', 'From OpenShift to Tanzu, RustFS is the only object storage that is part of the infrastructure foundation of leading Kubernetes distributions. With its massive portfolio of integrated applications, RustFS completes the software-defined picture.')}
                </p>

              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-neutral-100">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                {tw('边缘', 'Edge')}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-neutral-400">
                <p className="flex-auto">
                  {tw('RustFS 多云存储的完整二进制文件不到 100MB，能够为任何地方的对象存储提供支持 - 从 ARM SOC、5G POP 和边缘缓存设备到迷你数据中心。这就是 RustFS 主导边缘存储市场的原因。', 'The complete RustFS multi-cloud storage binary is less than 100MB, capable of powering object storage anywhere - from ARM SOCs, 5G POPs, and edge cache devices to mini data centers. This is why RustFS dominates the edge storage market.')}
                </p>

              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
