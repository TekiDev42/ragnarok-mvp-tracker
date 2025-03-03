import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { Box } from "@mantine/core";
import { setMvps } from "@/Store/Slice/Mvp/Slice";
import { getSortedMvp } from "@/Utils/getSortedMvp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Flex } from "@mantine/core";


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
    const [loading, setLoading] = useState(false)

    // Fetch MVPs when the component mounts
    useEffect(() => {
        const fetchMvps = async () => {
            setLoading(true)
            const mvps = await getSortedMvp()
            dispatch(setMvps(mvps))
            setLoading(false)
        }

        fetchMvps()
    }, [])

    // Load more items when scrolling
    const loadMore = () => {
        if (loading) return
        setLoading(true)
        setVisibleItems(prev => Math.min(prev + 18, mvps.length))
        setLoading(false)
    }

    useIntersectionObserver(loadMoreRef, loadMore)

    // Generate MvpCard components
    const items = useMemo(() => {
        // Show loading state only when mvps array is empty
        if (!mvps.length) {
            return Array(24)
                .fill(0)
                .map((_, i) => (
                <Box className="flex justify-center items-center glass shadow-lg" pos="relative" key={`skeleton-${i}`} style={{ height: 325, borderRadius: "1rem" }}>
                    <img src="/images/poring-loader.webp" alt="Poring loader" width={"41px"} height={"39px"}/>
                </Box>
            ))
        }

        return mvps.slice(0, visibleItems).map((mvp, i) => (
            <MvpCard key={mvp.Id ?? `mvp-${i}`} mvp={mvp} />
        ))
    }, [mvps, visibleItems])

    return (
        <div className={style.cardContainer} style={{ width: "100%" }}>
            {items}

            {loading && <Flex justify="center" align="center">
                <img src="/images/poring-loader.webp" alt="Poring loader" width={"41px"} height={"39px"}/>
            </Flex>}

            <div ref={loadMoreRef} style={{ height: "20px" }} />
        </div>
    )
}
