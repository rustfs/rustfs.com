export default function HomePricing() {
  return (
    <>
      {/* Features */}
      <div className="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            开源？商业？我们都支持
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            我们提供了两种不同的订阅计划，以满足您的需求。无论您是个人用户、小型团队还是大型企业，我们都有适合您的解决方案。
          </p>
        </div>

        <div className="relative xl:mx-auto xl:w-10/12">
          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              {/* Card */}
              <div className="relative z-10 rounded-xl border bg-white p-4 md:p-10 dark:border-neutral-800 dark:bg-neutral-900">
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
                <div className="mt-5 grid gap-y-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">
                  {/* List */}
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="flex size-5 items-center justify-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="flex size-5 items-center justify-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="flex size-5 items-center justify-center rounded-full bg-gray-50 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
              <div className="relative z-10 rounded-xl border bg-white p-5 shadow-xl shadow-gray-200 md:p-10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-gray-900/20">
                <h3 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                  Teams
                </h3>
                <div className="text-sm text-gray-500 dark:text-neutral-500">
                  For growing businesses.
                </div>
                <span className="absolute end-0 top-0 rounded-es-xl rounded-se-xl bg-gray-800 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-neutral-800">
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
                <div className="mt-5 grid gap-y-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">
                  {/* List */}
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-x-3">
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                        <svg
                          className="size-3.5 shrink-0"
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
                      className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
          <div className="absolute end-0 top-0 hidden translate-x-16 translate-y-16 md:block">
            <svg
              className="h-auto w-16 text-orange-500"
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
          <div className="absolute bottom-0 start-0 hidden -translate-x-16 translate-y-16 md:block">
            <svg
              className="h-auto w-56 text-cyan-500"
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
        <div className="mt-8 flex items-center justify-center gap-x-3 md:mt-12">
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Need a custom plan?
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            Contact us
          </button>
        </div>
      </div>
    </>
  )
}
