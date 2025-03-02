import { HoverCard, ActionIcon } from "@mantine/core";
import { StatsIcon } from "@components/Icons/Icons.tsx";


interface Stats {
    name: string;
    value: number;
}

interface StatsHoverCardProps {
    stats: Stats[];
}


export const StatsHoverCard = ({ stats }: StatsHoverCardProps) => {
    return (
        <HoverCard width={325} shadow="md">
            <HoverCard.Target>
                <ActionIcon
                    className="glass ro-cursor"
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 90 }}
                    color="#1e293b"
                    radius="xl"
                    aria-label="Action open stats"
                >
                    <StatsIcon />
                </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <ul className="w-full pt-0 px-3">
                    
                </ul>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}