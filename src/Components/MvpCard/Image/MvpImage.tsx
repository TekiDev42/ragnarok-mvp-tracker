import {PropsWithChildren,useEffect, useRef, ReactElement, useState} from "react";

export const MvpImage = ({preloadedImage}: PropsWithChildren & {preloadedImage: ReactElement | undefined}) => {
    const ref = useRef<HTMLImageElement>(null)
    const [imageElement, setImageElement] = useState<ReactElement | null>(null)

    const addImageToRef = () => {
        if (ref.current) {
            if (preloadedImage) {
                setImageElement(preloadedImage as ReactElement)
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