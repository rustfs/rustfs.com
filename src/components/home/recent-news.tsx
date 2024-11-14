/* eslint-disable @next/next/no-img-element */
import { getAllBlogPosts } from "@/utils/contents";
import { randomInt } from "crypto";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

export default async function RecentNews() {
  const posts = getAllBlogPosts().slice(0, 3);
  const randomNo = () => randomInt(1, 11);

  return (
    <>
      {/* Card Blog */}
      <div className="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            最新动态
          </h2>
          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            了解我们的最新产品和技术
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {posts.map((post: BlogPost) => (
            <a className="group flex flex-col focus:outline-none" key={post.meta.href} href={post.meta.href}>
              <div className="relative overflow-hidden rounded-xl pt-[50%] sm:pt-[70%]">
                <Image
                  className="absolute start-0 top-0 size-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                  src={`/images/placeholders/placeholder-${randomNo()}.jpg`}
                  alt="Blog Image"
                  width={500}
                  height={500}
                />
                {/* <span className="absolute end-0 top-0 rounded-es-xl rounded-se-xl bg-gray-800 px-3 py-1.5 text-xs font-medium text-white dark:bg-neutral-900">
                  Sponsored
                </span> */}
              </div>
              <div className="mt-7">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
                  {post.meta.title}
                </h3>
                <p className="mt-3 text-gray-800 dark:text-neutral-200">
                  {post.meta.excerpt}
                </p>
                <p className="mt-5 inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 group-hover:underline group-focus:underline dark:text-blue-500">
                  阅读全文
                  <svg
                    className="size-4 shrink-0"
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </p>
              </div>
            </a>
          ))}
          {/* End Card */}
        </div>
        {/* End Grid */}

        {/* Read more */}
        <div className="mt-12 text-center">
          <div className="inline-block rounded-full border bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-x-2 px-4 py-3">
              <p className="text-gray-600 dark:text-neutral-400">浏览更多动态?</p>
              <a
                className="inline-flex items-center gap-x-1.5 font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-blue-500"
                href="/blog"
              >
                阅读更多
                <ChevronRightIcon />
              </a>
            </div>
          </div>
        </div>
        {/* End read more */}

      </div>
      {/* End Card Blog */}
    </>
  )
}
