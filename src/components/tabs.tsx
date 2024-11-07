export function Tabs({ tabs, selected, onChange, className, iconClassName }) {
  return (
    <div className="-mx-4 flex overflow-auto sm:mx-0">
      <ul
        className="inline-grid flex-none gap-x-2 px-4 sm:px-0 xl:gap-x-6"
        style={{ gridTemplateColumns: `repeat(${Object.keys(tabs).length}, minmax(6rem, 1fr))` }}
      >
        {Object.entries(tabs).map(([name, Icon]: [string, React.ComponentType<{ selected: boolean }>]) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => onChange(name)}
              className={`group flex w-full flex-col items-center text-sm font-semibold ${selected === name ? className : ''
                }`}
            >
              <svg
                width="48"
                height="48"
                fill="none"
                aria-hidden="true"
                className={`mb-6 ${selected === name
                  ? iconClassName
                  : 'text-slate-300 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500'
                  }`}
              >
                <Icon selected={selected === name} />
              </svg>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
