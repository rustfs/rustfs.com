import Nav from '@/components/nav'
import navs from '@contents/docs/navs'

export default function DocsLayout({
  children,
}) {
  return (
    <div>
      <div>
        <div className="max-w-8xl relative mx-auto flex px-4 sm:px-6 md:px-8">
          <div className="sticky left-[max(0px,calc(50%-45rem))] right-auto top-16 z-20 hidden w-[19rem] shrink-0 pb-10 pl-8 pr-6 lg:block">
            <Nav navs={navs} />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
      {/* <Dialog
        onClose={() => { }}
        open={false}
        className="fixed inset-0 z-50 overflow-y-auto lg:hidden"
      >
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <DialogPanel className="relative w-80 max-w-[calc(100%-3rem)] bg-white p-6 dark:bg-slate-800">
          <button
            type="button"
            className="absolute right-5 top-5 z-10 flex size-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <span className="sr-only">Close navigation</span>
            <svg viewBox="0 0 10 10" className="size-2.5 overflow-visible">
              <path
                d="M0 0L10 10M10 0L0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Nav navs={navs} mobile={true} />
        </DialogPanel>
      </Dialog> */}
    </div>
  )
}
