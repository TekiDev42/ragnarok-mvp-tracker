import { useEffect } from 'react'

export const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>, callback: () => void, options = {}) => {
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
} 