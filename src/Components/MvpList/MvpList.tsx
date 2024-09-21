import style from "@/App.module.css";
import {MvpCard} from "@components/MvpCard/MvpCard.tsx";
import {useEffect} from "react";
import {getSortedMvp} from "@utils/getSortedMvp.ts";
import {setMvps} from "@store/Slice/Mvp/Slice.ts";
import {useAppDispatch, useAppSelector} from "@store/Hooks"
import {createChunk} from "@utils/createChunk.ts";

export const MvpList = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector(state => state.Slice.filtered)
    const perPage = useAppSelector(state => state.userSlice.perPage)
    const activePage = useAppSelector(state => state.userSlice.activePage)
    const data = createChunk(mvps.map(mvp => mvp), perPage)

    useEffect(() => {
        (async () => {
            const mvps = await getSortedMvp()
            dispatch(setMvps(mvps))
        })()
    }, [dispatch]);

    const items = data.length ? data[activePage - 1].map((mvp, i) => (
        <MvpCard key={`mvp-card-${i}`} mvp={mvp}/>
    )) : []

    return (
        <div className={style.cardContainer}
             style={{width: "100%"}}>
            {items.map(item => item)}
        </div>
    )
}