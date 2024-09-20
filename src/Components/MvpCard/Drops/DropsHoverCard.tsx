import {ActionIcon, HoverCard} from "@mantine/core";
import {DropsIcons} from "@components/Icons/Icons.tsx";
import {PropsWithChildren} from "react";
import {Drops} from "@components/MvpCard/Drops/Drops.tsx";

export const DropsHoverCard = ({drops, mvpDrops}: PropsWithChildren & {drops: Drop[], mvpDrops: Drop[]}) => {

    return (
        <HoverCard width={325} shadow="md">
            <HoverCard.Target>
                <ActionIcon className="glass ro-cursor" variant="gradient"
                            gradient={{from: 'teal', to: 'blue', deg: 90}}
                            color="#1e293b" radius="xl" aria-label="Action open drops">
                    <DropsIcons/>
                </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <ul className="w-full pt-0 px-3">
                    {drops && <Drops drops={drops} label={"Drops"}/>}
                    {mvpDrops && <Drops drops={mvpDrops} label={"Mvp drops"}/>}
                </ul>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}