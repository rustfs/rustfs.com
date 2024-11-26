'use client'

import { useEffect } from 'react';

export default function Subscribe() {
  useEffect(() => {
    // <script async data-uid="4e5692208c" src="https://unique-trader-2189.ck.page/4e5692208c/index.js"></script>
    const script = document.createElement('script');
    script.src = 'https://unique-trader-2189.ck.page/4e5692208c/index.js';
    script.async = true;
    script.setAttribute('data-uid', '4e5692208c');
    const kitForm = document.getElementById('kit-form');

    if (kitForm && kitForm.childNodes.length > 0) {
      return;
    }

    kitForm?.appendChild(script);
  }, [])
  return (
    <>
      {/* Subscribe */}
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            订阅 & 咨询
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            欢迎订阅我们的新闻和更新、也欢迎随时联系我们，我们会尽快回复您
          </p>
        </div>

        <div className="mt-8 text-center">
          <div id="kit-form" className='min-w-screen flex w-full flex-col items-center'></div>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-500">
            我们不会向您发送垃圾邮件，您可以随时取消订阅
          </p>
        </div>
      </div>
      {/* End Subscribe */}
    </>
  )
}
