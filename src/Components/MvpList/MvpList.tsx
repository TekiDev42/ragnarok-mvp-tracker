import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { setMvps } from "@/Store/Slice/Mvp/Slice";
import { getSortedMvp } from "@/Utils/getSortedMvp";
import { sortMvps } from "@/Utils/Sort/sortMvps";
import { useMemo } from "react";


export const MvpList = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const mvps = useAppSelector((state) => state.Slice.filtered)
    const [mvpsSorted, setMvpsSorted] = useState<Mvp[]>([])

    useEffect(() => {
        const fetchMvps = async () => {
            const sortedMvps = await getSortedMvp()
            dispatch(setMvps(sortedMvps))
            setLoading(false)
        }
        fetchMvps()
    }, [])

    useEffect(() => {
        const mvpsSorted = sortMvps(mvps)
        setMvpsSorted(mvpsSorted)
    }, [mvps])

    const items = useMemo(() => mvpsSorted.map((mvp, i) => (
        <MvpCard key={mvp.Id ?? `mvp-${i}`} mvp={mvp} />
    )), [mvpsSorted])

    return (
        <>
            <div className={style.cardContainer} style={{ width: "100%" }}>
                {!loading && items}
            </div>
        </>
    )
}
