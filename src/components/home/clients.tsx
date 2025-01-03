import { ChevronRightIcon } from "lucide-react";

export default function Clients() {
  return (
    <>
      {/* Clients */}
      <div className="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Title */}
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            值得信赖的开源软件<br /><span className="text-blue-500">超过 1,500+款软件协议兼容适配</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            {/* 超过 1,000+款开源软件适配 */}
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid grid-cols-3 gap-x-6 md:grid-cols-6">

          <img src="/images/inter/tensorflow.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/docker.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/elastic.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/grafana.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/kafka.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/mysql.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
   

       
        </div>
        {/* End Grid */}
        {/* Grid */}
        <div className="grid grid-cols-3 gap-x-6 sm:gap-x-6 md:grid-cols-5">
          <img src="/images/inter/nginx.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/postgresql.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/spark.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/prometheus.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
          <img src="/images/inter/webhooks.png" className="mx-auto h-auto w-16 py-3 text-gray-500 md:w-20 lg:w-24 lg:py-5 dark:text-neutral-500" />
         
        </div>
        {/* End Grid */}
        <div className="mt-8 text-center">
          <a
            className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href="/features/integration"
          >
            了解更多集成产品
            <ChevronRightIcon />
          </a>
        </div>
      </div>
      {/* End Clients */}
    </>
  )
}
