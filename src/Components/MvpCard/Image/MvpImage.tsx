import {PropsWithChildren, ReactElement, useState} from "react";

export const MvpImage = ({preloadedImage}: PropsWithChildren & {preloadedImage: ReactElement | undefined}) => {
    const [imageElement] = useState<ReactElement | undefined>(preloadedImage)

    return (
        <figure className={"overflow-visible"}>
            {imageElement}
        </figure>
    )
}