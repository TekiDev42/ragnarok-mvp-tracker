import { useAppSelector } from "@/Store/Hooks"
import { Drops } from "../MvpCard/Drops/Drops"

export const MvpDrops = ({mvp}: {mvp: Mvp}) => {
    const rates = useAppSelector(state => state.userSlice.rates)
    const cardRates = useAppSelector(state => state.userSlice.cardRates)

    return (
        <div className="flex gap-4">
            {mvp.Drops && mvp.Drops.length > 0 && <Drops drops={mvp.Drops} rates={rates} cardRates={cardRates} label="Drops" />}
            {mvp.MvpDrops && mvp.MvpDrops.length > 0 && <Drops drops={mvp.MvpDrops} rates={rates} cardRates={cardRates} label="MVP drops" />}
        </div>
    )
}
