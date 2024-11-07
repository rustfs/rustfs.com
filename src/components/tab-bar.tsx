import clsx from 'clsx'

export function TabBar({
  primary,
  secondary = [],
  showTabMarkers = true,
  side,
  translucent = false,
  children,
}) {
  return (
    <div className="flex text-xs leading-6 text-slate-400">
      <div className="flex flex-none items-center border-y border-b-sky-300 border-t-transparent px-4 py-1 text-sky-300">
        {primary.name}
        {showTabMarkers &&
          (primary.saved ? (
            <svg
              viewBox="0 0 4 4"
              className="ml-2.5 size-1 flex-none overflow-visible text-slate-500"
            >
              <path
                d="M-1 -1L5 5M5 -1L-1 5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <div className="ml-2.5 size-1 flex-none rounded-full bg-current" />
          ))}
      </div>
      <div
        className={clsx(
          'flex-auto flex items-center bg-slate-700/50 border border-slate-500/30',
          side === 'left' ? 'rounded-tl lg:rounded-tr' : 'rounded-tl',
          translucent && 'dark:bg-slate-800/50'
        )}
      >
        {secondary.map(({ name, open = true, className }) => (
          <div
            key={name}
            className={clsx('px-4 py-1 border-r border-slate-200/5', className, { italic: !open })}
          >
            {name}
          </div>
        ))}
        {children && (
          <div className="flex flex-auto items-center justify-end space-x-4 px-4">{children}</div>
        )}
      </div>
    </div>
  )
}
