import clsx from "clsx"
import { Fragment } from "react"

export default function TableOfContents({ tableOfContents, currentSection }) {
  function closeNav() {
  }

  function isActive(section) {
    if (section.slug === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  let pageHasSubsections = tableOfContents.some((section) => section.children.length > 0)

  return (
    <>
      <div className="px-8">
        <h5 className="mb-4 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
          On this page
        </h5>
        <ul className="text-sm leading-6 text-slate-700">
          {tableOfContents.map((section) => (
            <Fragment key={section.slug}>
              <li>
                <a
                  href={`#${section.slug}`}
                  onClick={closeNav}
                  className={clsx(
                    'block py-1',
                    pageHasSubsections ? 'font-medium' : '',
                    isActive(section)
                      ? 'font-medium text-sky-500 dark:text-sky-400'
                      : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                  )}
                >
                  {section.title}
                </a>
              </li>
              {section.children.map((subsection) => (
                <li className="ml-4" key={subsection.slug}>
                  <a
                    href={`#${subsection.slug}`}
                    onClick={closeNav}
                    className={clsx(
                      'group flex items-start py-1',
                      isActive(subsection)
                        ? 'text-sky-500 dark:text-sky-400'
                        : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                    )}
                  >
                    <svg
                      width="3"
                      height="24"
                      viewBox="0 -9 3 24"
                      className="mr-2 overflow-visible text-slate-400 group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                    >
                      <path
                        d="M0 0L3 3L0 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    {subsection.title}
                  </a>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      </div>
      <div className="mt-8 overflow-hidden">
        {/* <div>ads</div> */}
      </div>
    </>
  )
}
