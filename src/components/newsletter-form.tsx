export function NewsletterForm({ action }) {
  return (
    <form action={action} method="post" className="-mx-2 flex flex-wrap">
      <div className="mt-3 grow-[9999] basis-64 px-2">
        <div className="group relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-3 h-full w-6 text-slate-400 group-focus-within:text-sky-500 dark:group-focus-within:text-slate-400"
          >
            <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z" />
            <path d="m6 7 6 5 6-5" />
          </svg>
          <input
            name="email_address"
            type="email"
            required
            autoComplete="email"
            aria-label="Email address"
            className="block w-full appearance-none rounded-md border border-transparent bg-white py-2 pl-12 pr-3 leading-5 text-slate-900 shadow ring-1 ring-slate-900/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm dark:bg-slate-700/20 dark:text-white dark:ring-slate-200/20 dark:focus:ring-sky-500"
            placeholder="Subscribe via email"
          />
        </div>
      </div>
      <div className="mt-3 flex grow px-2">
        <button
          type="submit"
          className="flex-auto rounded-md border-y border-transparent bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 dark:hover:bg-sky-400 dark:focus:ring-sky-700 dark:focus:ring-offset-slate-900"
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}
