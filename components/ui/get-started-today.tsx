/* eslint-disable @next/next/no-img-element */
import FreeChatButton from "./buttons/free-chat";

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
];

export default function GetStartedToday() {
  return (
    <section
      className="relative overflow-hidden py-32 text-white"
      style={{
        backgroundImage: "url('/svgs/backgrounds/gradient-1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-lg text-center flex flex-col gap-8">
          <h2 className="font-display text-2xl tracking-wide sm:text-4xl font-semibold leading-tight">
            快速体验 RustFS 的 <br />
            高安全性，高并发和极致性能
          </h2>

          {/* Avatar Group */}
          <div className="text-center sm:flex sm:items-center sm:justify-center sm:text-start">
            <div className="shrink-0 pb-5 sm:flex sm:pb-0 sm:pe-5">
              {/* Avatar Group */}
              <div className="flex justify-center -space-x-3">
                {AVATAR_URLS.map((url, index) => (
                  <img
                    key={index}
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    src={url}
                    alt={`Avatar ${index + 1}`}
                  />
                ))}
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-gray-800 ring-2 ring-white dark:bg-neutral-900 dark:ring-neutral-900">
                  <span className="text-xs font-medium uppercase leading-none text-white">
                    100+
                  </span>
                </span>
              </div>
              {/* End Avatar Group */}
            </div>
            <div className="pt-5 sm:ps-5 sm:pt-0 lg:border-l">
              <div className="text-sm">
                超过 100+ 企业用户已经开始使用 RustFS
              </div>
            </div>
          </div>
          {/* End Avatar Group */}
          <div>
            <FreeChatButton className="bg-white px-6 py-2 text-slate-900" />
          </div>
        </div>
      </div>
    </section>
  )
}
