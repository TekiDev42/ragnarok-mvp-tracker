import { useEffect, useRef } from 'react'

export const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>, callback: () => void, options = {}) => {
    const observer = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback()
                }
            })
        }, options)

        const currentTarget = targetRef.current
        if (currentTarget) {
            observer.current?.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.current?.unobserve(currentTarget)
            }
        }
    }, [callback, options])

    return observer
} 