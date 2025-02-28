import { useAppSelector } from '@/Store/Hooks'
import { useEffect, useState } from 'react'

export const usePreFetch = (data: Mvp[][], activePage: number) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const [preloadedImages] = useState(new Map<string, HTMLImageElement>())

    useEffect(() => {
        const preloadNextPage = () => {

            const nextPageData = data[activePage]
            if (!nextPageData) return

            // Précharger les images des MVPs de la page suivante
            nextPageData.forEach(mvp => {
                if (mvp.image && mvp.Name) {
                    const path = animation ? `images/mvps/${mvp.image}` : `images/mvps/fixe/${mvp.image.replace('gif', 'png')}`
                    if (!preloadedImages.has(mvp.Name)) {
                        const img = new Image()
                        img.src = path
                        preloadedImages.set(mvp.Name, img)
                    }
                }
            })
        }

        preloadNextPage()
    }, [activePage, data, animation, preloadedImages])

    return preloadedImages
} 