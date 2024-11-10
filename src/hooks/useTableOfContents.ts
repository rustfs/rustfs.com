import { useCallback, useEffect, useState } from "react"

function getTop(id) {
  let el = document.getElementById(id)
  return el ? el.getBoundingClientRect().top + window.scrollY : 0
}

export default function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
  let [headings, setHeadings] = useState([])

  const registerHeading = useCallback((id) => {
    setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top: getTop(id) }])
  }, [])

  const unregisterHeading = useCallback((id) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id))
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return

    function onScroll() {
      let style = window.getComputedStyle(document.documentElement)
      let scrollMt = parseFloat((style.getPropertyValue('--scroll-mt').match(/[\d.]+/)?.[0] ?? 0) as string)
      let fontSize = parseFloat((style.fontSize.match(/[\d.]+/)?.[0] ?? 16) as string)
      scrollMt = scrollMt * fontSize

      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
      let top = window.pageYOffset + scrollMt + 1
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (top >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id
        }
      }
      setCurrentSection(current)
    }

    window.addEventListener('scroll', onScroll, {
      capture: true
    })

    onScroll()

    let resizeObserver = new window.ResizeObserver(() => {
      for (let heading of headings) {
        heading.top = getTop(heading.id)
      }
    })

    resizeObserver.observe(document.body)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll, {
        capture: true,
      })
    }
  }, [headings, tableOfContents])

  return { currentSection, registerHeading, unregisterHeading }
}
