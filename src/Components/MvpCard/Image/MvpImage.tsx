import {PropsWithChildren, ReactElement, useState, useEffect} from "react";

export const MvpImage = ({preloadedImage}: PropsWithChildren & {preloadedImage: ReactElement | null}) => {
    const [imageElement, setImageElement] = useState<ReactElement | null>(preloadedImage)

    useEffect(() => {
        setImageElement(preloadedImage)
    }, [preloadedImage])

    return (
        <figure className={"overflow-visible"}>
            {imageElement}
        </figure>
    )
}