import style from "@components/MvpCard/Image/MvpImage.module.css";
import {PropsWithChildren, SyntheticEvent} from "react";
import {useAppSelector} from "@store/Hooks.ts";

export const MvpImage = ({name, image}: PropsWithChildren & {name: string, image: string}) => {
    const animation = useAppSelector(state => state.userSlice.animation)
    const path = animation ? `images/mvps/${image}` : `images/mvps/fixe/${image.replace('gif', 'png')}`

    return (
        <figure className={"overflow-visible"}>
            <img className={style.mvpImage} loading={"lazy"}
                 onError={(e: SyntheticEvent<HTMLImageElement>) => {
                     e.currentTarget.src = `images/mvp-flag.png`
                 }}
                 src={path}
                 alt={name}/>
        </figure>
    )
}