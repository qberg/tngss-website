'use client'
import debounce from 'just-debounce-it'
import { useLayoutEffect } from 'react'

let cachedScrollbarWidth = null

function getScrollbarWidth() {
  if (cachedScrollbarWidth !== null) {
    return cachedScrollbarWidth
  }

  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  outer.remove()

  cachedScrollbarWidth = scrollbarWidth
  return scrollbarWidth
}

function onWindowResize() {
  document.documentElement.style.setProperty(
    '--vw',
    `${document.documentElement.offsetWidth * 0.01}px`
  )
  document.documentElement.style.setProperty(
    '--dvh',
    `${window.innerHeight * 0.01}px`
  )
  document.documentElement.style.setProperty(
    '--svh',
    `${document.documentElement.clientHeight * 0.01}px`
  )
  document.documentElement.style.setProperty('--lvh', '1vh')
  document.documentElement.style.setProperty(
    '--scrollbar-width',
    `${getScrollbarWidth()}px`
  )
}

const debouncedOnWindowResize = debounce(onWindowResize, 500)

export function RealViewport() {
  useLayoutEffect(() => {
    onWindowResize()

    window.addEventListener('resize', debouncedOnWindowResize, false)

    return () => {
      window.removeEventListener('resize', debouncedOnWindowResize, false)
    }
  }, [])

  return null
}
