import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { setMvps } from "@/Store/Slice/Mvp/Slice";
import { getSortedMvp } from "@/Utils/getSortedMvp";


export const MvpList = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const mvps = useAppSelector((state) => state.Slice.filtered)

    useEffect(() => {
        const fetchMvps = async () => {
            const sortedMvps = await getSortedMvp()
            dispatch(setMvps(sortedMvps))
            setLoading(false)
        }

        fetchMvps()
    }, [])

    return (
        <>
            <div className={style.cardContainer} style={{ width: "100%" }}>
                {!loading && mvps.map((mvp, i) => (
                    <MvpCard key={mvp.Id ?? `mvp-${i}`} mvp={mvp} />
                ))}
            </div>
        </>
    )
}
