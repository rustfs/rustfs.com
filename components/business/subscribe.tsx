'use client'

import { useTranslations } from "@/lib/i18n";
import { useEffect } from 'react';

export default function Subscribe() {
  const { t } = useTranslations('common');

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
    <section
      id='contact'
      className="relative overflow-hidden bg-background py-32 text-white"
    >
      {/* Subscribe */}
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            {t('Subscribe')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('Stay updated with the latest news and updates')}
          </p>
        </div>

        <div className="text-center">
          <div id="kit-form" className='flex w-full flex-col items-center'></div>
          <p className="mt-3 text-sm text-muted-foreground">
            {t('We respect your privacy')}
          </p>
        </div>
      </div>
      {/* End Subscribe */}
    </section>
  )
}
