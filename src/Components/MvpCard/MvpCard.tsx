import style from './MvpCard.module.css'
import {PropsWithChildren} from "react";
import {HeadstoneIcon} from "@components/Icons/Icons.tsx";
import {ActionIcon} from "@mantine/core";
import {MvpMapCardList} from "@components/MvpCard/Maps/MvpMapCardList.tsx";
import {MvpImage} from "@components/MvpCard/Image/MvpImage.tsx";
import {DropsHoverCard} from "@components/MvpCard/Drops/DropsHoverCard.tsx";
import {Bookmark} from "@components/MvpCard/Bookmark/Bookmark.tsx";
import {setMvp, setOpened} from "@store/Slice/Modal/ModalSlice.ts";
import {useAppDispatch} from "@store/Hooks.ts";


export const MvpCard = ({mvp}: PropsWithChildren & {mvp: Mvp}) => {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(setMvp(mvp))
        dispatch(setOpened(true))
    }

    return (
        <div className={`${style.card} glass`}>
            <Bookmark mvp={mvp}/>

            <div className={style.image_container}>
                <MvpImage image={mvp.image} name={mvp.Name}/>
            </div>

            <div className={style.content}>
                <div className={style.name}>
                    <h2>{mvp.Name}</h2>
                </div>

                <div className={"flex w-full flex-col gap-1"}>
                    <MvpMapCardList mvp={mvp}/>
                </div>
            </div>

            <div className={style.actions}>
                <DropsHoverCard drops={mvp.Drops ?? []} mvpDrops={mvp.MvpDrops ?? []} />

                <ActionIcon onClick={handleClick}
                             className="glass ro-cursor" variant="gradient"
                             gradient={{from: 'pink', to: 'violet', deg: 90}}
                             color="#1e293b" radius="xl" aria-label="Action set death mvp">
                    <HeadstoneIcon/>
                </ActionIcon>
            </div>
        </div>
    )
}