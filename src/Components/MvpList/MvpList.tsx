import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { setMvps } from "@/Store/Slice/Mvp/Slice";
import { getSortedMvp } from "@/Utils/getSortedMvp";


export const MvpList = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector((state) => state.Slice.filtered)


    useEffect(() => {
        const fetchMvps = async () => {
            const sortedMvps = await getSortedMvp()
            dispatch(setMvps(sortedMvps))
        }
        fetchMvps()
    }, [dispatch])
 
    
    return (
        <>
            <div className={style.cardContainer} style={{ width: "100%" }}>
                {mvps.map((mvp, i) => 
                    <MvpCard key={`${mvp.mvpMaps[0]?.name ?? "unknown"}-${mvp.mvpMaps[0]?.deathTime ?? "unknown"}-${i}`} mvp={mvp} />
                )}
            </div>
        </>
    )
}
