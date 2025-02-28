import style from "@components/MvpCard/Image/MvpImage.module.css";
import {PropsWithChildren,useEffect, useRef} from "react";
import {useAppSelector} from "@store/Hooks.ts";

export const MvpImage = ({name, image, imageObject}: PropsWithChildren & {name: string, image: string, imageObject?: HTMLImageElement}) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const ref = useRef<HTMLImageElement>(null)

    const addImageToRef = () => {
        if (ref.current) {
            if (imageObject) {
                ref.current.appendChild(imageObject)
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

                img.addEventListener("load", () => {
                    if (ref.current) {
                        ref.current.appendChild(img)
                    }
                }, {once: true})
            }
        }
    }


    useEffect(() => {
        addImageToRef()
    }, [ref])

    return (
        <figure ref={ref} className={"overflow-visible"}></figure>
    )
}