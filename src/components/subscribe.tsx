'use client'

import { useEffect } from 'react';

export default function Subscribe() {
  useEffect(() => {
    // <script async data-uid="4e5692208c" src="https://unique-trader-2189.ck.page/4e5692208c/index.js"></script>
    const script = document.createElement('script');
    script.src = 'https://unique-trader-2189.ck.page/4e5692208c/index.js';
    script.async = true;
    script.setAttribute('data-uid', '4e5692208c');
    if (document.getElementById('kit-form').childNodes.length > 0) {
      return;
    }
    document.getElementById('kit-form').appendChild(script);
  }, [])
  return (
    <>
      {/* Subscribe */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col justify-center">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            订阅 & 咨询
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            欢迎订阅我们的新闻和更新、也欢迎随时联系我们，我们会尽快回复您
          </p>
        </div>

        <div className="mt-8 text-center">
          <div id="kit-form" className='flex flex-col items-center w-full min-w-screen'></div>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-500">
            我们不会向您发送垃圾邮件，您可以随时取消订阅
          </p>
        </div>
      </div>
      {/* End Subscribe */}
    </>
  )
}
