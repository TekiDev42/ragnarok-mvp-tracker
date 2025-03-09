import { HoverCard, ActionIcon, Divider } from "@mantine/core";
import { StatsIcon } from "@components/Icons/Icons.tsx";
import style from "@components/MvpCard/Stats/StatsHover.module.css";
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
                <Divider my="xs" label="Stats" labelPosition="center" />
                <ul className={style.stats_hover}>
                    {mvp.Id && <li>ID: <span>{mvp.Id}</span></li>}
                    {mvp.AegisName && <li>Aegis: <span>{mvp.AegisName}</span></li>}
                    {mvp.Name && <li>Name: <span>{mvp.Name}</span></li>}
                    {mvp.JapaneseName && <li>JP Name: <span>{mvp.JapaneseName}</span></li>}
                    {mvp.Level && <li>Level: <span>{mvp.Level}</span></li>}
                    {mvp.Hp && <li>HP: {formatNumber(mvp.Hp)}</li>}
                    {mvp.BaseExp && <li>Base Exp: {formatNumber(mvp.BaseExp)}</li>}
                    {mvp.JobExp && <li>Job Exp: {formatNumber(mvp.JobExp)}</li>}
                    {mvp.MvpExp && <li>MVP Exp: {formatNumber(mvp.MvpExp)}</li>}
                    {mvp.Attack && <li>Attack: {formatNumber(mvp.Attack)}</li>}
                    {mvp.Attack2 && <li>Attack2: {formatNumber(mvp.Attack2)}</li>}
                    {mvp.Defense && <li>Defense: {formatNumber(mvp.Defense)}</li>}
                    {mvp.MagicDefense && <li>M.Def: {formatNumber(mvp.MagicDefense)}</li>}
                    {mvp.MagicResistance && <li>M.Res: {formatNumber(mvp.MagicResistance)}</li>}
                    {mvp.Resistance && <li>Res: {formatNumber(mvp.Resistance)}</li>}
                    {mvp.Str && <li>STR: <span>{mvp.Str}</span></li>}
                    {mvp.Agi && <li>AGI: <span>{mvp.Agi}</span></li>}
                    {mvp.Vit && <li>VIT: <span>{mvp.Vit}</span></li>}
                    {mvp.Int && <li>INT: <span>{mvp.Int}</span></li>}
                    {mvp.Dex && <li>DEX: <span>{mvp.Dex}</span></li>}
                    {mvp.Luk && <li>LUK: <span>{mvp.Luk}</span></li>}
                    {mvp.Sp && <li>SP: <span>{mvp.Sp}</span></li>}
                    {mvp.AttackRange && <li>Atk Range: <span>{mvp.AttackRange}</span></li>}
                    {mvp.SkillRange && <li>Skill Range: <span>{mvp.SkillRange}</span></li>}
                    {mvp.ChaseRange && <li>Chase Range: <span>{mvp.ChaseRange}</span></li>}
                    {mvp.Size && <li>Size: <span>{mvp.Size}</span></li>}
                    {mvp.Race && <li>Race: <span>{mvp.Race}</span></li>}
                    {mvp.Element && <li>Element: <span>{mvp.Element}</span></li>}
                    {mvp.ElementLevel && <li>Elem Level: <span>{mvp.ElementLevel}</span></li>}
                    {mvp.WalkSpeed && <li>Walk Speed: <span>{mvp.WalkSpeed}</span></li>}
                </ul>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}