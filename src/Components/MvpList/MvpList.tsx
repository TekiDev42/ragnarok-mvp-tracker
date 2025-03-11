import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { setMvps } from "@/Store/Slice/Mvp/Slice";
import { getSortedMvp } from "@/Utils/getSortedMvp";
import { sortMvps } from "@utils/Sort/sortMvps";
import { useMemo } from "react";


export const MvpList = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector((state) => state.Slice.filtered)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMvps = async () => {
            const sortedMvps = await getSortedMvp()
            dispatch(setMvps(sortedMvps))
            setLoading(false)
        }
        fetchMvps()
    }, [])
    
    const items = useMemo(() => sortMvps(mvps).map((mvp, i) => (
        <MvpCard key={mvp.Id ?? `mvp-${i}`} mvp={mvp} />
    )), [mvps])

    return (
        <>
            <div className={style.cardContainer} style={{ width: "100%" }}>
                {!loading && items}
            </div>
        </>
    )
}
