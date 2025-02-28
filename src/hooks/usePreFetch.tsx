import { useAppSelector } from '@/Store/Hooks'
import { ReactElement, useEffect, useState } from 'react'
import style from "@components/MvpCard/Image/MvpImage.module.css"


export const usePreFetch = (data: Mvp[]) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const [preloadedImages] = useState(new Map<string, ReactElement>())

    useEffect(() => {
        const preloadNextPage = () => {

            const imageData = data
            if (!imageData) return

            // Précharger les images des MVPs de la page suivante
            imageData.forEach(mvp => {
                if (mvp.image && mvp.Name) {
                    const path = animation ? `images/mvps/webp/animated/${mvp.image.replace('.gif', '.webp')}` : `images/mvps/webp/fixe/${mvp.image.replace('.png', '.webp')}`
                    if (!preloadedImages.has(mvp.Name)) {
                        const img = <img src={path} className={style.mvpImage} loading="lazy" alt={mvp.Name} />

                        preloadedImages.set(mvp.Name, img)
                    }
                }
            })
        }

        preloadNextPage()
    }, [data, animation, preloadedImages])

    return preloadedImages
} 