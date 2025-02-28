import style from "@components/MvpCard/Image/MvpImage.module.css";
import {PropsWithChildren,useEffect, useRef, SyntheticEvent, ReactElement, useState} from "react";
import {useAppSelector} from "@store/Hooks.ts";

export const MvpImage = ({name, image, preloadedImages}: PropsWithChildren & {name: string, image: string, preloadedImages: Map<string, ReactElement>}) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const ref = useRef<HTMLImageElement>(null)
    const [imageElement, setImageElement] = useState<ReactElement | null>(null)

    const addImageToRef = () => {
        if (ref.current) {
            if (!preloadedImages.has(name)) {
                const path = animation ? `images/mvps/${image}` : `images/mvps/fixe/${image.replace('gif', 'png')}`
                setImageElement(<img src={path} className={style.mvpImage} loading="lazy" alt={name} 
                                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                                    (e.currentTarget as HTMLImageElement).src = `images/mvp-flag.png`
                                }}
                            />)
            } else {
                setImageElement(preloadedImages.get(name) as ReactElement)
            }
        }
    }

    useEffect(() => {
        addImageToRef()
    }, [ref])

    return (
        <figure ref={ref} className={"overflow-visible"}>
            {imageElement}
        </figure>
    )
}