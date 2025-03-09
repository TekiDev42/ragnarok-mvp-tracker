/**
 * @file MvpCard.tsx
 * @description This file contains the MvpCard component, which displays information about an MVP (Most Valuable Player) in a card format.
 */

import style from './MvpCard.module.css'
import { HeadstoneIcon } from "@components/Icons/Icons.tsx";
import { ActionIcon, Flex, ScrollArea } from "@mantine/core";
import { MvpMapCardList } from "@components/MvpCard/Maps/MvpMapCardList.tsx";
import { DropsHoverCard } from "@components/MvpCard/Drops/DropsHoverCard.tsx";
import { Bookmark } from "@components/MvpCard/Bookmark/Bookmark.tsx";
import { setMvp, setOpened } from "@store/Slice/Modal/ModalSlice.ts";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { PropsWithChildren } from 'react';
import { GetPathImage } from '@/Utils/GetImage'
import { StatsHoverCard } from "@components/MvpCard/Stats/StatsHover.tsx";
import { Image } from "@mantine/core";

export const MvpCard = ({ mvp }: PropsWithChildren & { mvp: Mvp }) => {
    const dispatch = useAppDispatch();
    const animation = useAppSelector(state => state.userSlice.animation)

    /**
     * Handles the click event on the death action button
     * Opens the MVP death modal
     */
    const handleClick = () => {
        dispatch(setMvp(mvp));
        dispatch(setOpened(true));
    };

    return (
        <div className={`${style.card} glass`}>
            <div className="absolute top-2 left-2 text-xs text-white">{mvp.Id}</div>

            <Bookmark mvp={mvp} />

            <div className={style.image_container}>
                <Image src={GetPathImage({ mvp, animation })} fit="contain" fallbackSrc="/images/mvp-flag.png" />
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