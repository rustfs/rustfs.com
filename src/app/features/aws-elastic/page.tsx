import { RiArrowRightLine } from "@remixicon/react";
import { Metadata } from "next";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '适用于 Amazon Elastic Kubernetes Service的 RustFS',
  description: 'RustFS 是 Kubernetes 原生的高性能产品，可以在公有云、私有云和边缘云环境中提供可预测的性能。'
})

/* eslint-disable @next/next/no-img-element */
export default function AwsElastic() {
  return (
    <div>
      {/* Background Banner Section */}
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/framework/banner-1.png)' }}>
        <div className="relative z-10 space-y-20 px-6 py-16 text-center text-white">
          <h3 className="text-5xl font-bold">适用于 Amazon Elastic<br />
            Kubernetes Service的 RustFS</h3>
          <p className="mt-4 text-lg"></p>
          <div className="mx-auto max-w-screen-xl">
            <div className="space-y-20 rounded-lg bg-black/60 p-4 shadow lg:p-20">
              <h2 className="text-4xl font-bold">客户在Amazon Elastic 上运行 RustFS 有三个原因。</h2>
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
                <div className="space-y-10">
                  <h4 className="text-4xl text-blue-500">01</h4>
                  <p>RustFS 在混合云或多云部署场景中充当一致的存储层。</p>
                </div>
                <div className="space-y-10">
                  <h4 className="text-4xl text-blue-500">02</h4>
                  <p>RustFS 是 Kubernetes 原生的高性能产品，可以在公有云、私有云和边缘云环境中提供可预测的性能。</p>
                </div>
                <div className="space-y-10">
                  <h4 className="text-4xl text-blue-500">03</h4>
                  <p>在 EKS 上运行 RustFS 可以控制软件堆栈，并具有避免云锁定所需的灵活性。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-12 py-12 xl:py-24">
          <h2 className="text-primary text-center text-4xl font-bold">建筑</h2>
          <div className="space-y-10">
            <p>Amazon Elastic Kubernetes Service （Amazon EKS） 是一项托管服务，可用于在 AWS 上运行 Kubernetes，而无需安装、操作和维护自己的 Kubernetes 控制平面或节点。</p>
            <p>RustFS 在所有主要的 Kubernetes 平台（阿里云ACK、Tanzu、Azure、GCP、阿里云 ACK）上提供可移植的高性能对象存储系统。在 AWS 上，RustFS 与 Amazon EKS 服务原生集成，从而更轻松地将自己的大规模多租户对象存储即服务运行。RustFS 是 AWS S3 存储即服务的完全替代品。</p>
            <div className="rounded-xl border bg-white p-8 shadow">
              <img src="/images/framework/sec1-1.png" alt="" className="mx-auto max-w-3xl" />
            </div>
            <p>与 AWS S3 不同，RustFS 使应用程序能够跨多云和混合云基础设施进行扩展，而无需昂贵的软件重写或专有集成。由于 RustFS 是容器化和 Kubernetes 原生的，因此可以在这些平台上推出，而无需专业技能来操作大规模存储基础设施。</p>
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto max-w-screen-xl">
          <div className="container mx-auto space-y-12 py-12 xl:py-24">
            <h2 className="text-primary  text-center text-4xl font-bold">RustFS Operator 与 Amazon EKS 功能原生集成，以提供：</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div>
                <a href="#hash1" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon1.svg" alt="" /></div>
                  <div className="text-xl font-semibold">存储类和分层</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
              <div>
                <a href="#hash2" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon2.svg" alt="" /></div>
                  <div className="text-xl font-semibold">外部负载均衡</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
              <div>
                <a href="#hash3" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon3.svg" alt="" /></div>
                  <div className="text-xl font-semibold">加密密钥管理</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
              <div>
                <a href="#hash4" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon4.svg" alt="" /></div>
                  <div className="text-xl font-semibold">身份管理</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
              <div>
                <a href="#hash5" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon5.svg" alt="" /></div>
                  <div className="text-xl font-semibold">证书管理</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
              <div>
                <a href="#hash6" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon6.svg" alt="" /></div>
                  <div className="text-xl font-semibold">监视和警报</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
              <div>
                <a href="#hash7" className="bg-muted flex flex-col justify-center rounded-lg border p-6 text-center">
                  <div className="mx-auto mb-4 text-pink-500"><img src="/images/framework/icon7.svg" alt="" /></div>
                  <div className="text-xl font-semibold">日志记录和审核</div>
                  <p className="mt-2 text-gray-600">跨 NVMe、HDD 和公有云存储进行分层。</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto space-y-12 py-12 xl:py-24">

          <div className="space-y-6" id="hash1">
            <h3 className="text-primary text-center text-3xl font-bold">存储类和分层</h3>
            <p>在 阿里云 ACK 上大规模部署 RustFS 的关键要求是跨存储类（NVMe、HDD、公有云）的能力层。这使企业能够同时管理成本和性能。</p>
            <p>RustFS 支持将老化对象从快速 NVMe 层自动过渡到更具成本效益的 HDD 层，甚至是成本优化的冷公有云存储层。</p>
            <p>分层时，RustFS 会跨层提供统一的命名空间。跨层的移动对应用程序是透明的，并由客户确定的策略触发。</p>
            <p>
              RustFS 通过在源头加密对象，在 阿里云 ACK 混合云中提供安全存储，确保客户始终完全控制数据。当 阿里云 ACK 部署在公有云中时，分层功能可帮助 阿里云 ACK
              跨持久块存储和更便宜的对象存储层有效地管理数据。
            </p>
            <a className="flex items-center gap-2 text-blue-500" href="">阿里云 ACK 的 |了解持久性存储 -了解更多信息<RiArrowRightLine className="size-4" /></a>

            <a className="flex items-center gap-2 text-blue-500" href="">将对象从 RustFS 过渡到 S3 -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>

          <div className="space-y-6" id="hash2">
            <h3 className="text-primary text-center text-3xl font-bold">外部负载均衡</h3>
            <p>
              RustFS 的所有通信都基于HTTP、RESTful API，并将支持任何标准的Kubernetes兼容入口控制器。这包括基于硬件和软件定义的解决方案。最受欢迎的选择是NGINX。使用OperatorHub或OpenShift
              Marketplace进行安装，然后使用注释公开 RustFS 租户。
            </p>
            <a className="flex items-center gap-2 text-blue-500" href="">使用NGINX入口操作员 -了解更多信息<RiArrowRightLine className="size-4" /></a>
            <a className="flex items-center gap-2 text-blue-500" href="">为 RustFS 租户配置TLS/SSL -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>

          <div className="space-y-6" id="hash3">
            <h3 className="text-primary text-center text-3xl font-bold">加密密钥管理</h3>
            <p>没有原生的OpenShift密钥管理功能。因此， RustFS 建议使用HashiCorp Vault在对象存储系统之外存储密钥。这是云原生应用程序的最佳实践。</p>
            <p>对于所有生产环境，我们建议默认情况下在所有存储桶上启用加密。 RustFS 使用AES-256-GCM或ChaCha20-Poly1305加密来保护数据完整性和机密性，对性能的影响可以忽略不计。</p>
            <p>RustFS 支持所有三种服务器端加密（SSE-KMS、SSE-S3和SSE-C）模式。SSE-S3和SSE-KMS与服务器端的KMS集成，而SSE-C使用客户端提供的密钥。</p>
            <p>RustFS 将使用此KMS引导其内部密钥加密服务器（KES服务），以实现高性能的每对象加密。每个租户都在一个孤立的命名空间中运行自己的KES服务器。</p>
            <a className="flex items-center gap-2 text-blue-500" href="">在OpenShift 4中集成HashiCorp Vault -了解更多信息<RiArrowRightLine className="size-4" /></a>
            <a className="flex items-center gap-2 text-blue-500" href="">RustFS 加密和密钥管理 -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>
          <div className="space-y-6" id="hash4">
            <h3 className="text-primary text-center text-3xl font-bold">身份管理</h3>
            <p>
              在OpenShift上运行 RustFS 时，客户可以通过第三方OpenID Connect/LDAP兼容身份提供商（如Keycloak、Okta/Auth0、Google、Facebook、ActiveDirectory和OpenLDAP）管理单点登录（SSO）。 RustFS 推荐OpenID
              Connect兼容的Keycloak IDP。
            </p>
            <p>
              外部IDP允许管理员集中管理用户/应用程序身份。 RustFS 建立在IDP之上，提供AWS IAM风格的用户、组、角色、策略和令牌服务API。独立于基础设施的统一身份和访问管理（IAM）层的能力提供了显著的架构灵活性。
            </p>
            <a className="flex items-center gap-2 text-blue-500" href="">OpenShift | 了解身份提供商配置 -了解更多信息<RiArrowRightLine className="size-4" /></a>
            <a className="flex items-center gap-2 text-blue-500" href="">RustFS 身份和访问管理 -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>
          <div className="space-y-6" id="hash5">
            <h3 className="text-primary text-center text-3xl font-bold">证书管理</h3>
            <p>从应用程序到 RustFS 的所有流量，包括节点间流量，都使用TLS加密。TLS证书用于保护网络通信和建立网络连接资源的身份，例如 RustFS 服务器域。</p>
            <p>
              RustFS 与OpenShift证书管理器集成，因此您可以使用 RustFS 操作员为 RustFS 租户自动配置、配置、管理和更新证书。租户在自己的Kubernetes命名空间中完全相互隔离，拥有自己的证书，以提高安全性。
            </p>
            <a className="flex items-center gap-2 text-blue-500" href="">OpenShift和Let&apos;s Encrypt -了解更多信息<RiArrowRightLine className="size-4" /></a>
            <a className="flex items-center gap-2 text-blue-500" href="">RustFS 加密和密钥管理 -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>
          <div className="space-y-6" id="hash6">
            <h3 className="text-primary text-center text-3xl font-bold">监控和警报</h3>
            <p>
              RustFS 建议使用Grafana，OpenShift-user-workload-monitoring项目中安装的平台监控组件，或任何其他OpenShift容器监控工具连接到 RustFS 。 RustFS
              发布所有可想象的与存储相关的Prometheus指标，从存储桶容量到访问指标。这些指标可以在任何与Prometheus兼容的工具或 RustFS 控制台中收集和可视化。
            </p>
            <p>
              外部监测解决方案定期刮取 RustFS Prometheus端点。 RustFS 建议使用Grafana或openshift-user-workload-monitoring项目中安装的平台监控组件连接到 RustFS
              。这些相同的工具也可用于建立基线和设置通知警报阈值，然后可以路由到PagerDuty、Freshservice甚至SNMP等通知平台。
            </p>
            <a className="flex items-center gap-2 text-blue-500" href="">OpenShift | 了解监控堆栈 -了解更多信息<RiArrowRightLine className="size-4" /></a>
            <a className="flex items-center gap-2 text-blue-500" href="">如何使用Prometheus监控 RustFS 服务器 -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>

          <div className="space-y-6" id="hash7">
            <h3 className="text-primary text-center text-3xl font-bold">记录和审计</h3>
            <p>启用 RustFS 审计会为对象存储集群上的每个操作生成日志。除了审计日志外， RustFS 还记录控制台错误，用于操作故障排除。</p>
            <p>RustFS 支持将日志输出到弹性堆栈（或第三方）进行分析和警报。</p>

            <a className="flex items-center gap-2 text-blue-500" href="">了解红帽OpenShift日志记录 -了解更多信息<RiArrowRightLine className="size-4" /></a>

            <a className="flex items-center gap-2 text-blue-500" href="">RustFS 日志快速入门指南 -了解更多信息<RiArrowRightLine className="size-4" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
