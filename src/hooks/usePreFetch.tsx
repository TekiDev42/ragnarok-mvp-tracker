import { useAppSelector } from '@/Store/Hooks'
import { ReactElement, useEffect, useState } from 'react'
import { GetPathImage } from '@/Utils/GetImage'
import style from '@/Components/MvpCard/Image/MvpImage.module.css'

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
                    const img = GetPathImage({ mvp, animation })
                    const imageElement = <img src={img} className={style.mvpImage} loading="lazy" alt={mvp.Name} />
                    preloadedImages.set(mvp.Id, imageElement)
                }
            })
        }

        preloadNextPage()
    }, [data, animation, preloadedImages])

    return preloadedImages
} 