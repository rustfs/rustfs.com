export function List({ children }) {
  return <ul className="my-5 space-y-3">{children}</ul>
}

export function ListItemGood({ children }) {
  return (
    <li className="flex items-start space-x-4 pl-0 before:content-none">
      <div className="mt-1.5 flex size-4 items-center justify-center rounded-full bg-green-600 text-white ring-2 ring-green-600">
        <svg width="6" height="4.5" className="overflow-visible" aria-hidden="true">
          <path
            d="M6 0L2 4.5L0 2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span>{children}</span>
    </li>
  )
}

export function ListItemBad({ children }) {
  return (
    <li className="flex items-start space-x-4 pl-0 before:content-none">
      <div className="mt-1.5 flex size-4 items-center justify-center rounded-full bg-red-400 text-white ring-2 ring-red-400">
        <svg width="6" height="6" className="overflow-visible" aria-hidden="true">
          <path
            d="M0 0L6 6M6 0L0 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span>{children}</span>
    </li>
  )
}
