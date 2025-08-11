'use client'

/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/magicui/marquee";
import reviews from "@/data/reviews.json";
import clsx from "clsx";
import { useLocale, useTranslations } from 'next-intl';

type SlideItem = { name: { zh: string; en: string; }; position: { zh: string; en: string; }; body: { zh: string; en: string; }; img: string; }

// split reviews into 3 rows
const [firstRow, secondRow, thirdRow, fourthRow] = reviews.reduce(
  (acc: SlideItem[][], review, i) => {
    acc[i % 4].push(review);
    return acc;
  },
  [[], [], [], []] as SlideItem[][],
);

const ReviewCard = ({
  img,
  name,
  position,
  body,
  language,
}: SlideItem & { language: 'zh' | 'en' }) => {
  return (
    <figure
      className={clsx(
        "relative md:w-1/2 lg:w-full max-w-96 cursor-pointer overflow-hidden rounded-xl p-4 lg:p-6 shadow-xl",
        // light styles
        "border-neutral-950 bg-white hover:bg-neutral-50",
        // dark styles
        "dark:border-neutral-800 dark:bg-neutral-800/50 dark:hover:bg-neutral-700",
        "flex flex-col gap-2"
      )}
    >
      <blockquote className="text-muted-foreground text-sm tracking-wide">{body[language]}</blockquote>
      <div className="my-2 border-t"></div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name[language]}
          </figcaption>
          <p className="text-muted-foreground text-xs  font-medium">{position[language]}</p>
        </div>
        <img className="rounded-full" width="36" height="36" alt="" src={img} />
      </div>
    </figure>
  );
};

export default function HomeReviews() {
  const t = useTranslations();
  const locale = useLocale();
  const language = locale as 'zh' | 'en';

  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl tracking-wide font-bold md:text-4xl md:leading-tight text-primary">
            {t('reviews.What customers say about RustFS')}
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            {t('reviews.Exquisite service, professional team, providing you with the best service')}
          </p>
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg lg:hidden">
          <Marquee pauseOnHover vertical className="[--duration:60s] [--gap:2rem] lg:hidden">
            {reviews.map((review) => (
              <ReviewCard key={review.name[language] + review.position[language]} {...review} language={language} />
            ))}
          </Marquee>
        </div>
        <div className="relative hidden h-[500px] w-full w-full flex-row items-center justify-center overflow-hidden rounded-lg lg:flex">
          <Marquee pauseOnHover vertical className="[--duration:60s] [--gap:2rem] p-4">
            {firstRow.map((review) => (
              <ReviewCard key={review.name[language] + review.position[language]} {...review} language={language} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:60s] [--gap:2rem] p-4">
            {secondRow.map((review) => (
              <ReviewCard key={review.name[language] + review.position[language]} {...review} language={language} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:60s] [--gap:2rem] p-4">
            {thirdRow.map((review) => (
              <ReviewCard key={review.name[language] + review.position[language]} {...review} language={language} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:60s] [--gap:2rem] p-4">
            {fourthRow.map((review) => (
              <ReviewCard key={review.name[language] + review.position[language]} {...review} language={language} />
            ))}
          </Marquee>
          <div className="dark:from-background pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white"></div>
          <div className="dark:from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white"></div>
        </div>
      </div>
    </section>
  );
}
