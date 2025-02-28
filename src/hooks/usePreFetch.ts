import { useAppSelector } from '@/Store/Hooks'
import { useEffect } from 'react'

export const usePreFetch = (data: Mvp[][], activePage: number) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    useEffect(() => {
        const preloadNextPage = () => {
            const nextPageData = data[activePage]
            if (!nextPageData) return

            // Précharger les images des MVPs de la page suivante
            nextPageData.forEach(mvp => {
                if (mvp.image) {
                    const path = animation ? `images/mvps/${mvp.image}` : `images/mvps/fixe/${mvp.image.replace('gif', 'png')}`
                    const img = new Image()
                    img.src = path
                }
            })
        }

        preloadNextPage()
    }, [activePage, data])
} 