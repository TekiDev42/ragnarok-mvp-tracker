import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>, callback: () => void, options = {}) => {
    const observer = useRef<IntersectionObserver | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isLoading) {
                        return
                    }

                    setIsLoading(true)

                    setTimeout(() => {
                        callback()
                        setIsLoading(false)
                    }, 1000)
                }
            })
        }, options)

        const currentTarget = targetRef.current
        if (currentTarget) {
            observer.current?.observe(currentTarget)
        }

         setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => {
            if (currentTarget) {
                observer.current?.unobserve(currentTarget)
            }
        }
    }, [callback, options])

    return isLoading
} 