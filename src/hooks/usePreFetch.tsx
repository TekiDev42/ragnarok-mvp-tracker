import { useAppSelector } from '@/Store/Hooks'
import { ReactElement, useEffect, useState } from 'react'
import style from "@components/MvpCard/Image/MvpImage.module.css"


export const usePreFetch = (data: Mvp[]) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const [preloadedImages] = useState(new Map<number, ReactElement>())

    useEffect(() => {
        const preloadNextPage = () => {

            const imageData = data
            if (!imageData) return

            // Précharger les images des MVPs de la page suivante
            imageData.forEach(mvp => {
                if (mvp.image && mvp.Name) {
                    const imageName = mvp.image.replace('gif', 'webp')

                    const animatedPath = `images/mvps/webp/animated/${imageName}`
                    const fixedPath = `images/mvps/webp/fixe/${imageName}`

                    const path = animation ? animatedPath : fixedPath
                    
                    if (!preloadedImages.has(mvp.Id)) {
                        const img = <img src={path} className={style.mvpImage} loading="lazy" alt={mvp.Name} />
                        preloadedImages.set(mvp.Id, img)
                    }
                }
            })
        }

        preloadNextPage()
    }, [data, animation, preloadedImages])

    return preloadedImages
} 