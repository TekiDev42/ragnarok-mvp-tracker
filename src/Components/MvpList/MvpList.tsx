import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useMemo } from "react";
import { getSortedMvp } from "@utils/getSortedMvp.ts";
import { setMvps } from "@store/Slice/Mvp/Slice.ts";
import { useAppDispatch, useAppSelector } from "@store/Hooks"
import { createChunk } from "@utils/createChunk.ts";

export const MvpList = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector(state => state.Slice.filtered)
    const perPage = useAppSelector(state => state.userSlice.perPage)
    const activePage = useAppSelector(state => state.userSlice.activePage)

    const fetchMvps = async () => {
        const mvps = await getSortedMvp()
        dispatch(setMvps(mvps))
    }

    useEffect(() => {
        fetchMvps()
    }, [dispatch]);

    const data = useMemo(() => createChunk(mvps, perPage), [mvps, perPage])

    const items = useMemo(() => {
        if (!data.length) return []

        return data[activePage - 1].map((mvp, i) => (
            <MvpCard key={`mvp-card-${mvp.Id || i}`} mvp={mvp}/>
        ))

    }, [data, activePage])

    return (
        <div className={style.cardContainer} style={{width: "100%"}}>
            {items}
        </div>
    )
}