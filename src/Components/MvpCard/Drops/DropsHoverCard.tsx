import {ActionIcon, HoverCard} from "@mantine/core";
import {DropsIcons} from "@components/Icons/Icons.tsx";
import {Drops} from "@components/MvpCard/Drops/Drops.tsx";
import {useAppSelector} from "@store/Hooks.ts";
import { ScrollArea } from "@mantine/core";

export const DropsHoverCard: React.FC<{ drops: Drop[]; mvpDrops: Drop[] }> = ({ drops, mvpDrops }) => {

    const rates = useAppSelector(state => state.userSlice.rates)
    const cardRates = useAppSelector(state => state.userSlice.cardRates)

    return (
    <HoverCard width={325} shadow="md">
        <HoverCard.Target>
            <ActionIcon
                className="glass ro-cursor"
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 90 }}
                color="#1e293b"
                radius="xl"
                aria-label="Action open drops"
            >
                <DropsIcons />
            </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
            <ScrollArea h={340} type="always" className={"px-3"}>
                <ul className="w-full pt-0 px-3">
                    {drops.length > 0 && <Drops drops={drops} rates={rates} cardRates={cardRates} label="Drops" />}
                    {mvpDrops.length > 0 && <Drops drops={mvpDrops} rates={rates} cardRates={cardRates} label="MVP drops" />}
                    </ul>
            </ScrollArea>
        </HoverCard.Dropdown>
    </HoverCard>
    )
}