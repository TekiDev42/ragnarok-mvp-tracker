import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>, callback: () => void, options = {}) => {
    const observer = useRef<IntersectionObserver | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsLoading(true)
                    callback()
                    setIsLoading(false)
                }
            })
        }, options)

        const currentTarget = targetRef.current
        if (currentTarget) {
            observer.current?.observe(currentTarget)
        }

        setIsLoading(false)

        return () => {
            if (currentTarget) {
                observer.current?.unobserve(currentTarget)
            }
        }
    }, [callback, options])

    return isLoading
} 