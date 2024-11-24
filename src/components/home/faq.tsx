/* eslint-disable react/no-unescaped-entities */
export default function Faq() {
  const questions = [
    {
      question: "开发集群和标准集群有什么区别?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序",
    },
    {
      question: "HCP Vault 支持哪些公共云?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序",
    },
    {
      question: "HCP Vault Secrets 和 HCP Vault 之间有什么区别?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序",
    },
    {
      question: "HCP Vault Secrets 是否会在全球范围内以及发布时在哪些区域提供?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
    },
    {
      question: "我可以混合搭配计划吗?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
    },
    {
      question: "如果我取消订阅会怎样?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
    },
    {
      question: "如何升级我的订阅计划?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
    },
    {
      question: "当我的容量减少时，我的账单会怎样?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
    },
    {
      question: "开发集群和标准集群有什么区别?",
      answer: "开发单节点实例专为个人用户和构建概念验证项目而设计，不适用于生产环境。标准集群是生产就绪的多节点高可用Vault集群，可以支持企业应用程序"
    },
  ];

  return (
    <>
      {/* FAQ */}
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                大家关心的
                <span className="text-primary-600 dark:text-primary-500">问题</span>
              </h2>
              <p className="mt-1 hidden text-gray-600 md:block dark:text-neutral-400">
                我们的团队会尽力回答您的问题，如果您有任何问题，请随时联系我们。
              </p>
            </div>
          </div>
          {/* End Col */}
          <div className="md:col-span-3">
            {/* Accordion */}
            <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="hs-accordion py-3"
                  id={`faq-${i}`}
                >
                  <button
                    className="hs-accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 rounded-lg pb-3 text-start font-semibold text-gray-800 transition hover:text-gray-500 focus:text-gray-500 focus:outline-none md:text-lg dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                    aria-expanded="false"
                    aria-controls={`faq-${i}`}
                  >
                    {q.question}
                    <svg
                      className="hs-accordion-active:hidden block size-5 shrink-0 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:block hidden size-5 shrink-0 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                  <div
                    id={`faq-${i}`}
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    role="region"
                    aria-labelledby={`faq-${i}`}
                  >
                    <p className="text-gray-600 dark:text-neutral-400">
                      {q.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* End Accordion */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End FAQ */}
    </>

  )
}
