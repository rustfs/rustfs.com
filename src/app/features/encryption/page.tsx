
/* eslint-disable @next/next/no-img-element */
export default function Encryption() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url(/images/banner-s/s-5.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center">
          <h1 className="text-5xl font-bold">大规模数据的基础设施</h1>
          <p className="mt-4 text-lg">
            RustFS 专为扩展而设计。技术规模、运营规模和经济规模。基础规模。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl space-y-10">
        <p className="text-center text-xl font-bold">在对象存储领域，需要强大的加密才能在谈判桌上占有一席之地。RustFS 通过最高级别的加密以及广泛的优化提供更多功能，几乎消除了通常与存储加密操作相关的开销。</p>

        <div className="rounded-xl border p-8 shadow">
          <img src="/images/s-5/s5-1.png" alt="" />
        </div>
        <p>
          RustFS 在存储在磁盘上和通过网络传输时对数据进行加密。RustFS 最先进的加密方案支持使用现代行业标准加密算法（如 AES-256-GCM、ChaCha20-Poly1305 和 AES-CBC）进行精细的对象级加密。RustFS 与 S3 加密语义完全兼容，并且还通过支持非 AWS 密钥管理服务（如 Hashicorp Vault、Gemalto KeySecure 和 Google Secrets Manager）来扩展 S3。
        </p>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-6 py-12 leading-loose">
          <h2 className="text-center text-3xl font-bold">网络加密</h2>
          <div className="space-y-2">
            <p>
              当数据在对象存储和应用程序之间传输时，它可能会在任意数量的未知和/或不受信任的网络之间反弹。在数据通过网络传输时对其进行加密（也称为“线合”）可成功缓解中间人攻击，并确保无论采用何种路由，数据都保持安全。
            </p>
            <p>
              RustFS 支持集群中所有组件之间的传输层安全性 （TLS）
              v1.2+。此方法可确保集群间或集群内加密流量中没有薄弱环节。TLS是一个无处不在的加密框架：它与银行、电子商务网站和其他依赖数据存储加密的企业级系统使用的加密协议相同。shttps
            </p>
            <p>
              RustFS 的 TLS 实现在 CPU 指令级别进行了优化，性能开销可以忽略不计。它只需要为集群中的每个 RustFS 服务器指定 TLS 私钥和公有证书。对于 Kubernetes 环境，RustFS Kubernetes Operator
              在租户部署过程中集成/自动生成和分配 TLS 证书。RustFS 支持多个 TLS 证书，其中每个证书对应一个特定的域名。RustFS 使用服务器名称指示 （SNI） 来确定为任何给定请求提供哪个证书。
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-6 py-12 leading-loose">
          <h2 className="text-center text-3xl font-bold">对象加密</h2>
          <div className="space-y-2">
            <p>
              存储在磁盘上的数据完全依赖于磁盘的安全性，并延伸到主机系统来确保数据的安全。RustFS
              服务器端对象加密在数据存储在磁盘上之前自动加密数据（静态加密）。此方法可保证不会将任何数据写入未加密的磁盘。此基线安全层可确保静态数据的机密性、完整性和真实性。RustFS
              支持客户端驱动和自动存储桶默认对象加密，以实现数据加密的最大灵活性。
            </p>
            <p>
              RustFS 服务器端加密与 Amazon AWS-S3 语义 （SSE-S3） 兼容。RustFS 扩展了对 AWS KMS 的基准支持，以包括常见的企业 KMS 系统，例如 Hashicorp Vault 和 Thales Ciphertrust（以前称为 Gemalto
              KeySecure）。RustFS 还支持客户端驱动的加密 （SSE-C），其中应用程序可以指定用于加密对象的数据密钥。对于 SSE-S3 和 SSE-C，RustFS 服务器执行所有加密操作，包括密钥轮换和对象的重新加密。
            </p>
            <p>
              通过自动服务器端加密，RustFS 使用唯一密钥对每个对象进行加密，并使用动态加密密钥和从外部 KMS 或客户端提供的密钥派生的密钥应用多层附加加密。这种安全而复杂的方法在 RustFS
              中进行，无需处理多个独立的内核和用户空间加密实用程序。
            </p>
            <p>
              RustFS 使用身份验证加密方案 （AEAD） 在对象写入或读取对象存储时对对象进行加密/解密。RustFS AEAD 加密支持 AES-256-GCM 和 ChaCha20-Poly1305 等行业标准加密协议，以保护对象数据。RustFS 的 CPU
              级优化（如 SIMD 加速）确保了 en/decipion 操作的性能开销可以忽略不计。组织可以随时运行自动存储桶级加密，而不是被迫做出次优的安全选择。
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        {/* Standard Boxes Section */}
        <div className="container mx-auto space-y-6 bg-gray-100 p-12 leading-loose">
          <h2 className="text-center text-3xl font-bold">RustFS密钥加密服务</h2>
          <div className="space-y-2">
            <p>
              RustFS 提供了用于密钥加密的内置选项。RustFS 的密钥加密服务 （KES） 是一种用于高性能应用程序的无状态分布式密钥管理系统。它被设计为在 Kubernetes 中运行并将加密密钥分发给应用程序。KES 是 RustFS
              服务器端对象加密 （SSE-S3） 的必需组件。
            </p>
            <p>
              KES 支持 RustFS 集群上的加密操作，是确保可扩展和高性能加密操作的关键机制。KES 充当 RustFS 集群和外部 KMS 之间的中介，根据需要生成加密密钥并执行加密操作，不受 KMS
              限制的限制。因此，仍然有一个中央 KMS 保护主密钥并充当基础设施中的信任根。KES 无需启动每组应用程序的 KMS，从而简化了部署和管理。相反，应用程序可以从 KES 服务器请求数据加密密钥 （DEK） 或要求
              KES 服务器解密加密的 DEK。
            </p>
            <p>由于 KES 服务器是完全无状态的，因此可以自动扩展，例如通过 Kubernetes 水平自动缩放器。同时，由于 KES 独立处理绝大多数应用程序请求，因此中央 KMS 的负载不会显着增加。</p>
            <p>对于 Kubernetes 环境，RustFS Kubernetes Operator 支持为每个租户部署和配置 KES，启用 SSE-S3 作为每个租户部署的一部分。</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="rounded-xl border p-8 shadow">
          <img src="/images/s-5/s5-2.png" alt="" className="mx-auto max-w-3xl" />
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="container mx-auto max-w-screen-xl space-y-6 py-12">
          <h2 className="text-center text-3xl font-bold">支持的外部密钥管理系统</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <img src="/images/s-5/s5i-1.png" alt="" className="rounded border" />
            <img src="/images/s-5/s5i-2.png" alt="" className="rounded border" />
            <img src="/images/s-5/s5i-3.png" alt="" className="rounded border" />
            <img src="/images/s-5/s5i-4.png" alt="" className="rounded border" />
            <img src="/images/s-5/s5i-5.png" alt="" className="rounded border" />
            <img src="/images/s-5/s5i-6.png" alt="" className="rounded border" />
          </div>
        </div>
      </div>
    </div >
  )
}
