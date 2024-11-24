
/* eslint-disable @next/next/no-img-element */
export default function Lifecycle() {
  return (
    <div className="space-y-8 leading-loose">
      <div className="text-primary-foreground relative bg-gradient-to-t from-blue-600 to-blue-200 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/banner-s/s-9.png)' }}>
        <div className="relative z-10 px-6 py-20 text-center">
          <h1 className="text-5xl font-bold">数据生命周期管理和分层</h1>
          <p className="mt-4 text-lg">
          </p>
        </div>
      </div>


      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto py-12">
          <div className="flex flex-wrap items-center">
            <div className="w-full space-y-4 p-6 md:w-1/2">
              <p>
                随着数据的不断增长，针对访问、安全性和经济性进行协同优化的能力成为一项硬性要求，而不是锦上添花。这就是生命周期数据管理的作用。RustFS 提供了一套独特的功能来保护云内部和云之间的数据 -
                包括公共和私有云。
                RustFS的企业数据生命周期管理工具，包括版本控制、对象锁定和各种衍生组件，满足许多用例。随着数据的不断增长，针对访问、安全性和经济性进行协同优化的能力成为一项硬性要求，而不是锦上添花。这就是生命周期数据管理的作用。RustFS
                提供了一套独特的功能来保护云内部和云之间的数据 - 包括公共和私有云。 RustFS的企业数据生命周期管理工具，包括版本控制、对象锁定和各种衍生组件，满足许多用例。
              </p>
            </div>
            <div className="w-full p-6 md:w-1/2">
              <img src="/images/s-9/s9-1.png" alt="" className="mx-auto h-64 object-scale-down" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="container mx-auto flex items-start gap-8 py-12">
          <div className="flex w-1/5 flex-col gap-4 rounded border p-6 shadow">
            <div><a href="#sec1" className="">对象过期</a></div>
            <div><a href="#sec2" className="">基于策略的对象分层</a></div>
            <div><a href="#sec3" className="">跨存储介质</a></div>
            <div><a href="#sec4" className="">跨云类型</a></div>
            <div><a href="#sec5" className="">在公有云中</a></div>
          </div>
          <div className="w-4/5 space-y-6 leading-loose">
            <div>
              <h3 id="sec1" className="text-primary text-xl font-bold">对象过期</h3>
              <p>数据不必永远存在：RustFS 生命周期管理工具允许您定义数据在删除之前在磁盘上保留多长时间。用户将时间长度定义为 RustFS 开始删除对象的特定日期或天数。</p>
              <p>生命周期管理规则是按存储桶制定的，可以使用对象和标签筛选器的任意组合来构建。不指定筛选条件以设置整个存储桶的到期规则，或指定多个规则以制定更复杂的到期行为。</p>
              <p>
                RustFS
                对象过期规则也适用于版本控制存储桶，并附带一些特定于版本控制的风格。例如，您可以仅对对象的非当前版本指定到期规则，以最大限度地发挥对象版本控制的优势，而不会产生长期存储成本。同样，您可以创建生命周期管理规则，用于删除其唯一剩余版本为删除标记的对象。
              </p>
              <p>存储桶过期规则完全符合 RustFS WORM 锁定和法定保留 - 处于锁定状态的对象将保留在磁盘上，直到锁定过期或被明确解除。一旦对象不再受锁定约束，RustFS 就会开始正常应用到期规则。</p>
              <p>RustFS 对象过期生命周期管理规则在功能和语法上与 AWS Lifecycle Management 兼容。RustFS 还支持以 JSON 格式导入现有规则，从而轻松迁移现有 AWS 到期规则。</p>
            </div>
            <div>
              <h3 id="sec2" className="text-primary text-xl font-bold">基于策略的对象分层</h3>
              <p>
                RustFS 可以以编程方式配置对象存储分层，以便对象根据任意数量的变量从一种状态或类转换到另一种状态或类 -
                尽管最常用的是访问的时间和频率。最好在分层的上下文中理解此功能。分层允许用户优化存储成本或功能，以应对不断变化的数据访问模式。分层数据存储一般用于以下场景：
              </p>
            </div>

            <div>
              <h3 id="sec3" className="text-primary text-xl font-bold">跨存储介质</h3>
              <p>
                跨存储介质分层是最著名和最直接的分层用例。在这里，RustFS 对底层介质进行了抽象，并针对性能和成本进行了协同优化。例如，对于性能或近线工作负载，数据可能存储在 NVMe 或 SSD
                上，但在一段时间后分层到 HDD 介质，或者用于重视性能扩展的工作负载。随着时间的推移，如果合适，可以将该数据进一步迁移到长期存储中。
              </p>
              <div className="rounded-xl border p-8 shadow">
                <img src="/images/s-9/s9-2.png" alt="" className="mx-auto max-w-lg" />
              </div>
            </div>
            <div>
              <h3 id="sec4" className="text-primary text-xl font-bold">跨云类型</h3>
              <p>
                一个快速出现的用例涉及使用公有云的廉价存储和计算资源作为私有云的另一层。在此用例中，使用适当的私有云介质执行面向性能的近线工作负载。数据量无关紧要，但价值和性能预期无关紧要。随着数据量的增加和性能预期的降低，企业可以使用公有云的冷存储选项来优化与保留数据相关的成本和访问能力。
              </p>
              <p>
                这是通过在私有云和公共云上运行RustFS来实现的。使用复制，RustFS 可以将数据移动到廉价的公共云选项上，并在必要时使用公共云中的 RustFS 来保护和访问它。在这种情况下，公有云成为 RustFS
                的哑存储，就像 JBOD 成为 RustFS 的哑存储一样。此方法可避免替换和添加过时的磁带基础结构。
              </p>
              <div className="rounded-xl border p-8 shadow">
                <img src="/images/s-9/s9-3.png" alt="" className="mx-auto max-w-2xl" />
              </div>
            </div>
            <div>
              <h3 id="sec5" className="text-primary text-xl font-bold">在公有云中</h3>
              <p>
                RustFS 通常充当公有云中的主要应用程序存储层。在这种情况下，与其他用例一样，RustFS 是应用程序访问的唯一存储。应用程序（和开发人员）不需要知道存储终结点以外的任何内容。RustFS
                根据管理参数确定哪些数据属于何处。例如，RustFS 可以确定块数据应移动到对象层，以及哪个对象层满足企业的性能和经济目标。
              </p>
              <p>
                RustFS 结合了不同的存储分层层，并确定合适的介质，以在不影响性能的情况下提供更好的经济性。应用程序只是通过 RustFS 寻址对象，而 RustFS
                透明地应用策略在层之间移动对象，并将该对象的元数据保留在块层中。
              </p>
              <div className="rounded-xl border p-8 shadow">
                <img src="/images/s-9/s9-4.png" alt="" className="mx-auto max-w-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}
