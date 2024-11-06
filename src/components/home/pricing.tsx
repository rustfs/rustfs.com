export default function HomePricing() {
  return (
    <>
      {/* Features */}
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            开源？商业？我们都支持
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            我们提供了两种不同的订阅计划，以满足您的需求。无论您是个人用户、小型团队还是大型企业，我们都有适合您的解决方案。
          </p>
        </div>

        <div className="relative xl:w-10/12 xl:mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              {/* Card */}
              <div className="p-4 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-neutral-900 dark:border-neutral-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                  Professional
                </h3>
                <div className="text-sm text-gray-500 dark:text-neutral-500">
                  Everything a small team needs.
                </div>
                <div className="mt-5">
                  <span className="text-6xl font-bold text-gray-800 dark:text-neutral-200">
                    $18
                  </span>
                  <span className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                    .00
                  </span>
                  <span className="ms-3 text-gray-500 dark:text-neutral-500">
                    USD / monthly
                  </span>
                </div>
                <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
                  {/* List */}
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Up to 10 people
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Collect data
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Code extensibility
                      </span>
                    </li>
                  </ul>
                  {/* End List */}
                  {/* List */}
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-x-3">
                      <span className="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Custom reports
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Product support
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Activity reporting
                      </span>
                    </li>
                  </ul>
                  {/* End List */}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Cancel anytime.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      No card required.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      Start free trial
                    </button>
                  </div>
                </div>
              </div>
              {/* End Card */}
            </div>
            <div>
              {/* Card */}
              <div className="shadow-xl shadow-gray-200 p-5 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-gray-900/20">
                <h3 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                  Teams
                </h3>
                <div className="text-sm text-gray-500 dark:text-neutral-500">
                  For growing businesses.
                </div>
                <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-white dark:text-neutral-800">
                  Most popular
                </span>
                <div className="mt-5">
                  <span className="text-6xl font-bold text-gray-800 dark:text-neutral-200">
                    $36
                  </span>
                  <span className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                    .99
                  </span>
                  <span className="ms-3 text-gray-500 dark:text-neutral-500">
                    USD / monthly
                  </span>
                </div>
                <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
                  {/* List */}
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Up to 10 people
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Collect data
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Code extensibility
                      </span>
                    </li>
                  </ul>
                  {/* End List */}
                  {/* List */}
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Custom reports
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Product support
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="shrink-0 size-3.5"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-neutral-200">
                        Activity reporting
                      </span>
                    </li>
                  </ul>
                  {/* End List */}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Cancel anytime.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      No card required.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Start free trial
                    </button>
                  </div>
                </div>
              </div>
              {/* End Card */}
            </div>
          </div>
          {/* End Grid */}
          {/* SVG Element */}
          <div className="hidden md:block absolute top-0 end-0 translate-y-16 translate-x-16">
            <svg
              className="w-16 h-auto text-orange-500"
              width={121}
              height={135}
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
          {/* SVG Element */}
          <div className="hidden md:block absolute bottom-0 start-0 translate-y-16 -translate-x-16">
            <svg
              className="w-56 h-auto text-cyan-500"
              width={347}
              height={188}
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
        </div>
        <div className="mt-7 text-center">
          <p className="text-xs text-gray-400">Prices in USD. Taxes may apply.</p>
        </div>
        {/* End Features */}

        {/* Button Group */}
        <div className="mt-8 md:mt-12 flex justify-center items-center gap-x-3">
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Need a custom plan?
          </p>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            Contact us
          </button>
        </div>
      </div>
    </>
  )
}
