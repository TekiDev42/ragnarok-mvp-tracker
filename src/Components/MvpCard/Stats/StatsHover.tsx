import { HoverCard, ActionIcon} from "@mantine/core";
import { StatsIcon } from "@components/Icons/Icons.tsx";
import { NumberFormatter } from "@mantine/core";

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
        <HoverCard width={325} shadow="md">
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
            <HoverCard.Dropdown style={{ width: "auto" }}>
                <div className="flex gap-1">
                    

                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <div>Level: <span>{mvp.Level}</span></div>
                        <div>Name: <span>{mvp.Name}</span></div>
                        <div>Aegis name: <span>{mvp.AegisName}</span></div>
                        {mvp.JapaneseName && <div>Japanese Name: <span>{mvp.JapaneseName}</span></div>}
                        <div>HP: {formatNumber(mvp.Hp ?? 0)}</div>
                        {mvp.BaseExp && <div>Base Exp: {formatNumber(mvp.BaseExp ?? 0)}</div>}
                        {mvp.JobExp && <div>Job Exp: {formatNumber(mvp.JobExp ?? 0)}</div>}
                        {mvp.MvpExp && <div>MVP Exp: {formatNumber(mvp.MvpExp ?? 0)}</div>}
                    </div>

                    <div className="flex flex-col gap-1">
                        {mvp.AttackRange && <div>Atk Range: <span>{mvp.AttackRange}</span></div>}
                        {mvp.SkillRange && <div>Skill Range: <span>{mvp.SkillRange}</span></div>}
                        {mvp.ChaseRange && <div>Chase Range: <span>{mvp.ChaseRange}</span></div>}
                        {mvp.Size && <div>Size: <span>{mvp.Size}</span></div>}
                        {mvp.ElementLevel && <div>Elem Level: <span>{mvp.ElementLevel}</span></div>}
                        {mvp.WalkSpeed && <div>Walk Speed: <span>{mvp.WalkSpeed}</span></div>}
                    </div>

                    <div className="flex flex-col gap-1">
                        {mvp.Attack && <div>Attack: {formatNumber(mvp.Attack ?? 0)}</div>}
                        {mvp.Attack2 && <div>Attack2: {formatNumber(mvp.Attack2 ?? 0)}</div>}
                        {mvp.Defense && <div>Defense: {formatNumber(mvp.Defense ?? 0)}</div>}
                        {mvp.MagicDefense && <div>Magic Defense: {formatNumber(mvp.MagicDefense ?? 0)}</div>}
                        {mvp.MagicResistance && <div>Magic Resistance: {formatNumber(mvp.MagicResistance ?? 0)}</div>}
                        {mvp.Resistance && <div>Resistance: {formatNumber(mvp.Resistance ?? 0)}</div>}
                    </div>

                    <div className="flex flex-col gap-1">
                        {mvp.Str && <div>STR: {mvp.Str}</div>}
                        {mvp.Agi && <div>AGI: {mvp.Agi}</div>}
                        {mvp.Vit && <div>VIT: {mvp.Vit}</div>}
                        {mvp.Int && <div>INT: {mvp.Int}</div>}
                        {mvp.Dex && <div>DEX: {mvp.Dex}</div>}
                        {mvp.Luk && <div>LUK: {mvp.Luk}</div>}
                    </div>

                </div>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}