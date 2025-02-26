import {ActionIcon, HoverCard} from "@mantine/core";
import {DropsIcons} from "@components/Icons/Icons.tsx";
import {Drops} from "@components/MvpCard/Drops/Drops.tsx";
import {useAppSelector} from "@store/Hooks.ts";
/**
 * DropsHoverCard component displays a hover card with drop information for MVPs.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Drop[]} props.drops - An array of regular drops
 * @param {Drop[]} props.mvpDrops - An array of MVP-specific drops
 *
 * @returns {JSX.Element} A HoverCard component containing drop information
 *
 * @example
 * <DropsHoverCard drops={regularDrops} mvpDrops={mvpSpecificDrops} />
 */
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
            <ul className="w-full pt-0 px-3">
                {drops.length > 0 && <Drops drops={drops} rates={rates} cardRates={cardRates} label="Drops" />}
                {mvpDrops.length > 0 && <Drops drops={mvpDrops} rates={rates} cardRates={cardRates} label="MVP drops" />}
            </ul>
        </HoverCard.Dropdown>
    </HoverCard>
    )
}