/**
 * @file MvpCard.tsx
 * @description This file contains the MvpCard component, which displays information about an MVP (Most Valuable Player) in a card format.
 */

import style from './MvpCard.module.css'
import { HeadstoneIcon } from "@components/Icons/Icons.tsx";
import { ActionIcon, Flex } from "@mantine/core";
import { MvpMapCardList } from "@components/MvpCard/Maps/MvpMapCardList.tsx";
import { MvpImage } from "@components/MvpCard/Image/MvpImage.tsx";
import { DropsHoverCard } from "@components/MvpCard/Drops/DropsHoverCard.tsx";
import { Bookmark } from "@components/MvpCard/Bookmark/Bookmark.tsx";
import { setMvp, setOpened } from "@store/Slice/Modal/ModalSlice.ts";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { GetPathImage } from '@/Utils/GetImage'
import { ScrollArea } from "@mantine/core";
import { StatsHoverCard } from "@components/MvpCard/Stats/StatsHover.tsx";

export const MvpCard = ({ mvp }: PropsWithChildren & { mvp: Mvp }) => {
    const dispatch = useAppDispatch();
    const animation = useAppSelector(state => state.userSlice.animation)
    const [image, setImage] = useState<ReactElement | null>(null)

    /**
     * Handles the click event on the death action button
     * Opens the MVP death modal
     */
    const handleClick = () => {
        dispatch(setMvp(mvp));
        dispatch(setOpened(true));
    };

    useEffect(() => {
        const img = GetPathImage({ mvp, animation })
        setImage(<img src={img} className={style.mvpImage} alt={mvp.Name} onError={(event) => {
            event.currentTarget.src = "/images/mvp-flag.png"
        }} />)
    }, [mvp, animation])

    return (
        <div className={`${style.card} glass`}>
            <Bookmark mvp={mvp} />

            <div className={style.image_container}>
                <MvpImage preloadedImage={image} />
            </div>

            <div className={style.content}>
                <h2 className={style.name}>{mvp.Name}</h2>

                <ScrollArea h={100} type="auto" w={"100%"} className={"px-3"}>
                    <MvpMapCardList mvp={mvp} />
                </ScrollArea>
            </div>

            <div className={style.actions}>
                <Flex flex={1} gap={8}>
                    <StatsHoverCard mvp={mvp} />
                    <DropsHoverCard drops={mvp.Drops ?? []} mvpDrops={mvp.MvpDrops ?? []} />
                </Flex>

                {mvp.mvpMaps.length > 0 && <ActionIcon
                    onClick={handleClick}
                    className="glass ro-cursor"
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'violet', deg: 90 }}
                    color="#1e293b"
                    radius="xl"
                    aria-label="Action set death mvp"
                >
                    <HeadstoneIcon />
                </ActionIcon>}
            </div>
        </div>
    );
};