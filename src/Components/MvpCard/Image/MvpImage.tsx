import style from "@components/MvpCard/Image/MvpImage.module.css";
import {PropsWithChildren,useEffect, useRef} from "react";
import {useAppSelector} from "@store/Hooks.ts";

export const MvpImage = ({name, image, preloadedImages}: PropsWithChildren & {name: string, image: string, preloadedImages: Map<string, HTMLImageElement>}) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const ref = useRef<HTMLImageElement>(null)

    const addImageToRef = () => {
        if (ref.current) {
            if (preloadedImages.has(name)) {
                ref.current.appendChild(preloadedImages.get(name) as Node)
            } else {
                const path = animation ? `images/mvps/${image}` : `images/mvps/fixe/${image.replace('gif', 'png')}`
                const img = new Image()

                img.src = path
                img.classList.add(style.mvpImage)
                img.loading = "lazy"
                img.alt = name

                img.addEventListener("error", (e: ErrorEvent) => {
                    (e.currentTarget as HTMLImageElement).src = `images/mvp-flag.png`
                }, {once: true})

                ref.current.appendChild(img)
            }
        }
    }

    useEffect(() => {
        addImageToRef()

        return () => {
            
        }
    }, [ref])

    return (
        <figure ref={ref} className={"overflow-visible"}></figure>
    )
}