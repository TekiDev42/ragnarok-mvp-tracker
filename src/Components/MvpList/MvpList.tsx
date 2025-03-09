import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { Box } from "@mantine/core";
import { setMvps } from "@/Store/Slice/Mvp/Slice";
import { getSortedMvp } from "@/Utils/getSortedMvp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";


/**
 * MvpList Component
 *
 * This component is responsible for rendering a list of MVP (Most Valuable Player) cards.
 * It fetches MVP data and implements infinite scrolling.
 */
export const MvpList = () => {
    const dispatch = useAppDispatch()
    const loadMoreRef = useRef<HTMLDivElement>(null)

    const mvps = useAppSelector((state) => state.Slice.filtered)
    const [visibleItems, setVisibleItems] = useState(18)

    // Fetch MVPs when the component mounts
    useEffect(() => {
        const fetchMvps = async () => {
            const mvps = await getSortedMvp()
            dispatch(setMvps(mvps))
        }

        fetchMvps()
    }, [])

    const loadMore = () => {
        setVisibleItems(prev => Math.min(prev + 18, mvps.length))
    }

    const loading = useIntersectionObserver(loadMoreRef, loadMore)

    const items = useMemo(() => {
        return mvps.slice(0, visibleItems).map((mvp, i) => (
            <MvpCard key={mvp.Id ?? `mvp-${i}`} mvp={mvp} />
        ))
    }, [mvps, visibleItems])

    return (
        <>
            <div className={style.cardContainer} style={{ width: "100%" }}>
                {items}
            </div>
            <div className={"grid grid-cols-6 justify-center items-center w-full gap-8"} ref={loadMoreRef} style={{ height: "50px" }}>
                { loading && items.length < mvps.length && Array(24)
                    .fill(0)
                    .map((_, i) => (
                        <Box className="flex justify-center items-center glass shadow-lg w-full" pos="relative" key={`skeleton-${i}`} style={{ height: 325, borderRadius: "1rem" }}>
                            <img src="/images/poring-loader.webp" alt="Poring loader" width={"41px"} height={"39px"}/>
                        </Box>
                    ))
                }
            </div>
        </>
    )
}
