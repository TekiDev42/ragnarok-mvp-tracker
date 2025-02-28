import { useEffect, useRef } from 'react'

export const useIntersectionObserver = (callback: () => void, options = {}) => {
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback()
        }
      })
    }, options)

    const currentTarget = targetRef.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [callback, options])

  return targetRef
} 