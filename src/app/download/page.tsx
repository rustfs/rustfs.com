'use client'

import clsx from "clsx";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Pricing() {
  const [tab, setTab] = useState('professional');
  const [platform, setPlatform] = useState('Kubernetes');

  return (
    <div className="leading-loose">
      {/* Background Banner Section */}
      <div className="text-primary relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/download/banner.png)' }}>
        <div className="relative z-10 space-y-10 px-6 py-16 text-center xl:py-24">
          <h3 className="text-5xl font-bold">下载</h3>
          <p className="text-lg">
            要了解有关许可和商标指南的更多信息，请访问 <a href="/trademark" className="text-blue-500">商标使用规范</a>
          </p>
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center space-y-6 py-20">
          <div className="text-primary mx-auto flex items-center justify-center rounded-full border border-gray-500 p-2">
            <div className={clsx('p-4 px-12 font-bold text-xl rounded-full', { 'bg-pink-500 text-white': tab == 'professional' })} onClick={() => setTab('professional')}>专业版</div>
            <div className={clsx('p-4 px-12 font-bold text-xl rounded-full', { 'bg-pink-500 text-white': tab == 'sdk' })} onClick={() => setTab('sdk')}>SDK 下载</div>
          </div>
          {/* tabs content */}
          <div className="w-full flex-1 pt-8 xl:pt-16">
            {tab === 'professional' && (
              <>
                <ul className="grid grid-cols-6">
                  <li
                    onClick={() => setPlatform('Kubernetes')}
                    className={clsx(
                      'border-b-2 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-b-pink-500',
                      platform === 'Kubernetes' && 'border-b-pink-500'
                    )}>
                    <img src="/images/download/Kubernetes.svg" alt="" />
                    <span>Kubernetes</span>
                  </li>
                  <li
                    onClick={() => setPlatform('Docker')}
                    className={clsx(
                      'border-b-2 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-b-pink-500',
                      platform === 'Docker' && 'border-b-pink-500'
                    )}>
                    <img src="/images/download/docker.svg" alt="" />
                    <span>Docker</span>
                  </li>
                  <li
                    onClick={() => setPlatform('Linux')}
                    className={clsx(
                      'border-b-2 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-b-pink-500',
                      platform === 'Linux' && 'border-b-pink-500'
                    )}>
                    <img src="/images/download/linux.svg" alt="" />
                    <span>Linux</span>
                  </li>
                  <li
                    onClick={() => setPlatform('Windows')}
                    className={clsx(
                      'border-b-2 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-b-pink-500',
                      platform === 'Windows' && 'border-b-pink-500'
                    )}>
                    <img src="/images/download/windows-fill.svg" alt="" />
                    <span>Windows</span>
                  </li>
                  <li
                    onClick={() => setPlatform('MacOS')}
                    className={clsx(
                      'border-b-2 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-b-pink-500',
                      platform === 'MacOS' && 'border-b-pink-500'
                    )}>
                    <img src="/images/download/mac.svg" alt="" />
                    <span>MacOS</span>
                  </li>
                  <li
                    onClick={() => setPlatform('code')}
                    className={clsx(
                      'border-b-2 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-b-pink-500',
                      platform === 'code' && 'border-b-pink-500'
                    )}>
                    <img src="/images/download/source2.svg" alt="" />
                    <span>源代码</span>
                  </li>
                </ul>

                {platform === 'Kubernetes' && (
                  <div className="space-y-10">
                    <div className="grid w-full grid-cols-1 gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                      <div className="space-y-10">
                        <h3 className="text-primary text-3xl font-bold">RustFS for Windows</h3>
                        <p>安装后即可发起和接受远程控制，提供安全顺畅的远程体验</p>
                        <div className="flex items-center gap-4">
                          <a href="#" className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400 ">下载 （32 位系统）</a>
                          <a href="#" className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400 ">下载 （32 位系统）</a>
                        </div>
                        <p className="text-muted-foreground">V15.5.0.61000（2024.07）</p>
                      </div>
                      <div>
                        <img src="/images/download/login.png" alt="" className="mx-auto max-w-lg" />
                      </div>
                    </div>
                    <div className="space-y-10 text-center">
                      <h3 className="text-primary text-3xl font-bold">美观的界面，全中文支持</h3>
                      <p>支持Windows、macOS、Android、Linux等平台，实现跨平台，多系统一键部署</p>
                      <p>
                        <img src="/images/download/screen.png" alt="" className="mx-auto max-w-5xl" />
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
            {tab === 'sdk' && (
              <div className="space-y-10">
                <h3 className="text-primary text-center text-3xl font-bold">RustFS SDK下载</h3>
                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
                  <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border px-4 py-8">
                    <img src="/images/download/window.svg" alt="" />
                    <h4>Java SDK</h4>
                    <div className="text-muted-foreground">
                      v2.2.0
                    </div>
                    <div className="btns">
                      <a className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">下载</a>
                    </div>
                  </div>
                  <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border px-4 py-8">
                    <img src="/images/download/mac2.svg" alt="" />
                    <h4>Node.js SDK</h4>
                    <div className="text-muted-foreground">
                      v2.2.0</div>
                    <div className="btns">
                      <a className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">下载</a>
                    </div>
                  </div>
                  <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border px-4 py-8">
                    <img src="/images/download/linux2.svg" alt="" />
                    <h4>Go SDK</h4>
                    <div className="text-muted-foreground">
                      v2.2.0</div>
                    <div className="btns">
                      <a className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">下载</a>
                    </div>
                  </div>
                  <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border px-4 py-8">
                    <img src="/images/download/source.svg" alt="" />
                    <h4>Rust SDK</h4>
                    <div className="text-muted-foreground">
                      v2.2.0</div>
                    <div className="btns">
                      <a className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">下载</a>
                    </div>
                  </div>
                  <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border px-4 py-8">
                    <img src="/images/download/ios2.svg" alt="" />
                    <h4>.Net SDK</h4>
                    <div className="text-muted-foreground">
                      v2.2.0</div>
                    <div className="btns">
                      <a className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">下载</a>
                    </div>
                  </div>
                  <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border px-4 py-8">
                    <img src="/images/download/adriod.svg" alt="" />
                    <h4>Python SDK</h4>
                    <div className="text-muted-foreground">
                      v2.2.0</div>
                    <div className="btns">
                      <a className="rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">下载</a>
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col gap-5 rounded-lg bg-neutral-200/60 p-8">
                    <h3 className="text-primary text-xl font-bold">C++ SDK</h3>
                    <p className="flex-1">通过远程控制SDK可实现一对一、一对多操作，实现远端桌面、远程运维等场景，支持免费使用30天</p>
                    <div><a className="inline-block rounded-lg bg-pink-500 px-8 py-2 text-white hover:bg-pink-400" href="">去开发者平台</a></div>
                  </div>
                  <div className="flex flex-col gap-5 rounded-lg bg-neutral-200/60 p-8">
                    <h3 className="text-primary text-xl font-bold">更多SDK嵌入咨询请致电：</h3>
                    <p className="flex-1 text-xl font-bold text-blue-500">400-008-5211 转 2</p>
                    <div><a className="inline-block rounded-lg border border-pink-500 bg-white px-8 py-2 text-pink-500 hover:border-pink-400" href="">联系我们</a></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div >
      </div >
    </div>
  )
}
