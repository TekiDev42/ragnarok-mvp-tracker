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
import { Badge } from "@mantine/core";
import { getBadgeColor } from "@/Utils/getBadgeColor";


export const MvpCard = ({ mvp }: PropsWithChildren & { mvp: Mvp }) => {
    const dispatch = useAppDispatch();
    const animation = useAppSelector((state) => state.userSlice.animation);

    /**
     * Handles the click event on the death action button
     * Opens the MVP death modal
     */
    const handleClick = () => {
        dispatch(setMvp(mvp));
        dispatch(setOpened(true));
    };

    const handleClickLink = () => {
        const link = `https://ratemyserver.net/index.php?mob_name=${mvp.Id}&page=re_mob_db&quick=1&f=1&mob_search=Search`;
        window.mvpApi.openLink(link);
    }

    return (
        <div id={mvp.Id.toString()} className={`${style.card} glass`}>
            <div className={"flex items-center justify-between py-0 px-2"}>
                <Badge w={"fit-content"} autoContrast size="xs" color={"white"} onClick={handleClickLink} className="ro-cursor">
                    {mvp.Id}
                </Badge>
                <Bookmark mvp={mvp} />
            </div>

            <div className={style.image_container}>
                <Image src={GetPathImage({ mvp, animation })} fit="contain" fallbackSrc="/images/mvp-flag.png" />
            </div>

            <div className={style.content}>
                <div className="flex flex-col gap-2 w-full justify-center items-center">
                    <Flex justify="center" align="center" gap={8}>
                        <Badge w={"fit-content"} autoContrast size="xs" color={getBadgeColor(mvp.Size ?? '')}>{mvp.Size}</Badge>
                        <Badge w={"fit-content"} autoContrast size="xs" color={getBadgeColor(mvp.Race ?? '')}>{mvp.Race}</Badge>
                        <Badge w={"fit-content"} autoContrast size="xs" color={getBadgeColor(mvp.Element ?? '')}>{mvp.Element} Lvl: {mvp.ElementLevel}</Badge>
                    </Flex>

                    <h2 className={"w-full text-sm uppercase text-center text-white tracking-wider"}>{mvp.Name}</h2>
                </div>

                <ScrollArea h={100} type="auto" w={"100%"} className={"px-3"}>
                    <MvpMapCardList mvp={mvp} />
                </ScrollArea>
            </div>

            <div className={style.actions}>
                <Flex gap={8} flex={1}>
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