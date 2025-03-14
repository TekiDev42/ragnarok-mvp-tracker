import { HoverCard, ActionIcon} from "@mantine/core";
import { StatsIcon } from "@components/Icons/Icons.tsx";
import { NumberFormatter } from "@mantine/core";
import { Badge } from "@mantine/core";
import { RadarChart } from '@mantine/charts';

interface StatsHoverCardProps {
    mvp: Mvp
}

const formatNumber = (value: number) => {

    let suffix = ""
    let valueFixed = ''

    if (value >= 1_000_000_000) {
        suffix = "b"
        valueFixed = (value / 1_000_000_000).toFixed(1)
    }

    else if (value >= 1_000_000) {
        suffix = "m"
        valueFixed = (value / 1_000_000).toFixed(1)
    }

    else if (value >= 1_000) {
        suffix = "k"
        valueFixed = (value / 1_000).toFixed(1)
    } else {
        valueFixed = value.toString()
    }

    return <NumberFormatter suffix={suffix} thousandSeparator=" " decimalSeparator="," value={valueFixed} />
}

export const StatsHoverCard = ({ mvp }: StatsHoverCardProps) => {
    return (
        <HoverCard width={"auto"} shadow="md">
            <HoverCard.Target>
                <ActionIcon
                    className="glass ro-cursor"
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'grape', deg: 90 }}
                    color="#1e293b"
                    radius="xl"
                    aria-label="Action open stats"
                >
                    <StatsIcon />
                </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown style={{ width: "fit-content" }}>

            <div className="flex justify-center items-center gap-2">
                <Badge autoContrast size="lg" color="violet.1">
                    Level: {mvp.Level}
                </Badge>

                <Badge autoContrast size="lg" color="violet.1">
                    HP: {formatNumber(mvp.Hp ?? 0)}
                </Badge>
            </div>

            <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-md font-bold">Attack</h2>
                        <div className="grid grid-cols-2 justify-left gap-1 py-1">
                            <Badge autoContrast fullWidth size="md" color="green.1">
                                Attack: {formatNumber(mvp.Attack ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="green.1">
                                Attack2: {formatNumber(mvp.Attack2 ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="green.1">
                                Atk Range: {formatNumber(mvp.AttackRange ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="green.1">
                                Skill Range: {formatNumber(mvp.SkillRange ?? 0)}
                            </Badge>
                            
                            <Badge autoContrast fullWidth size="md" color="green.1">
                                Chase Range: {formatNumber(mvp.ChaseRange ?? 0)}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-md font-bold">Defense</h2>
                        <div className="grid grid-cols-2 justify-left gap-1 py-1">
                            <Badge autoContrast fullWidth size="md" color="yellow.1">
                                Defense: {formatNumber(mvp.Defense ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="yellow.1">
                                Magic Defense: {formatNumber(mvp.MagicDefense ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="yellow.1">
                                Magic Resistance: {formatNumber(mvp.MagicResistance ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="yellow.1">
                                Resistance: {formatNumber(mvp.Resistance ?? 0)}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-md font-bold">Exp</h2>
                        <div className="grid grid-cols-2 justify-left gap-1 py-1">
                            <Badge autoContrast fullWidth size="md" color="red.1">
                                Base Exp: {formatNumber(mvp.BaseExp ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="red.1">
                                Job Exp: {formatNumber(mvp.JobExp ?? 0)}
                            </Badge>

                            <Badge autoContrast fullWidth size="md" color="red.1">
                                MVP Exp: {formatNumber(mvp.MvpExp ?? 0)}
                            </Badge>
                        </div>
                    </div>        
                </div>

                <div className="flex flex-col gap-1 items-center">
                    <h2 className="text-md font-bold text-center">Stats</h2>
                    <RadarChart
                        h={200}
                        w={300}
                    data={[
                        {stat: `STR ${mvp.Str ?? 0}`, value: mvp.Str ?? 0},
                        {stat: `AGI ${mvp.Agi ?? 0}`, value: mvp.Agi ?? 0},
                        {stat: `VIT ${mvp.Vit ?? 0}`, value: mvp.Vit ?? 0},
                        {stat: `INT ${mvp.Int ?? 0}`, value: mvp.Int ?? 0},
                        {stat: `DEX ${mvp.Dex ?? 0}`, value: mvp.Dex ?? 0},
                        {stat: `LUK ${mvp.Luk ?? 0}`, value: mvp.Luk ?? 0},
                    ]}
                        dataKey="stat"
                        withPolarRadiusAxis
                        series={[{ name: 'value', color: 'blue.4', opacity: 0.2 }]}
                        style={{zIndex: 1}}
                    />
                </div>
            </div>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}