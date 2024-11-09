const css = `
  body {
    display: flex;
  }
  #__next {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

export default function Error() {
  return (
    <div className="flex flex-auto flex-col items-center justify-center px-4 text-center sm:flex-row">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:mr-6 sm:border-r sm:border-slate-900/10 sm:pr-6 sm:text-3xl dark:text-slate-200 sm:dark:border-slate-300/10">
        404
      </h1>
      <h2 className="mt-2 text-lg text-slate-700 sm:mt-0 dark:text-slate-400">
        This page could not be found.
      </h2>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </div>
  )
}

Error.layoutProps = {
  meta: {
    title: '404',
  },
}
