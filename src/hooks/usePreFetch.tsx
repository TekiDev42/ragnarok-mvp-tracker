import { useAppSelector } from '@/Store/Hooks'
import { ReactElement, useEffect, useState } from 'react'
import style from "@components/MvpCard/Image/MvpImage.module.css"


export const usePreFetch = (data: Mvp[][], activePage: number) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const [preloadedImages] = useState(new Map<string, ReactElement>())

    useEffect(() => {
        const preloadNextPage = () => {

            const nextPageData = data[activePage]
            if (!nextPageData) return

            // Précharger les images des MVPs de la page suivante
            nextPageData.forEach(mvp => {
                if (mvp.image && mvp.Name) {
                    const path = animation ? `images/mvps/${mvp.image}` : `images/mvps/fixe/${mvp.image.replace('gif', 'png')}`
                    if (!preloadedImages.has(mvp.Name)) {
                        const img = <img src={path} className={style.mvpImage} loading="lazy" alt={mvp.Name} />

                        preloadedImages.set(mvp.Name, img)
                    }
                }
            })
        }

        preloadNextPage()
    }, [activePage, data, animation, preloadedImages])

    return preloadedImages
} 