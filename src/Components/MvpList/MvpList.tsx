import style from "@/App.module.css";
import { MvpCard } from "@components/MvpCard/MvpCard.tsx";
import { useEffect, useMemo } from "react";
import { getSortedMvp } from "@utils/getSortedMvp.ts";
import { setMvps } from "@store/Slice/Mvp/Slice.ts";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { createChunk } from "@utils/createChunk.ts";
import { Box, LoadingOverlay } from "@mantine/core";
import { useMvpCache } from "@/hooks/useMvpCache";
import { usePreFetch } from "@/hooks/usePreFetch";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

/**
 * MvpList Component
 *
 * This component is responsible for rendering a list of MVP (Most Valuable Player) cards.
 * It fetches MVP data, manages pagination, and renders MVP cards based on the current page.
 */
export const MvpList = () => {
  const dispatch = useAppDispatch();
  const { mvps, fetchAndCacheMvps } = useMvpCache();
  const perPage = useAppSelector((state) => state.userSlice.perPage);
  const activePage = useAppSelector((state) => state.userSlice.activePage);

  /**
   * Fetches sorted MVP data and updates the Redux store
   */
  const fetchMvps = async () => {
    const mvps = await getSortedMvp();
    dispatch(setMvps(mvps));
  };

  // Fetch MVPs when the component mounts
  useEffect(() => {
    fetchAndCacheMvps();
  }, []);

  // Create chunks of MVP data based on the number of items per page
  const data = useMemo(() => createChunk<Mvp>(mvps, perPage), [mvps, perPage]);

  // Enable pre-fetching for next page
  usePreFetch(data, activePage);

  // Reference for infinite scroll
  const loadMoreRef = useIntersectionObserver(() => {
    if (activePage < data.length) {
      // Implement your pagination logic here
      // For example: dispatch(setActivePage(activePage + 1));
    }
  });

  // Generate MvpCard components for the current page
  const items = useMemo(() => {
    // Show loading state only when mvps array is empty
    if (!mvps.length)
      return Array(perPage)
        .fill(0)
        .map((_, i) => (
          <Box pos="relative" key={`skeleton-${i}`} style={{ height: 325 }}>
            <LoadingOverlay
              visible={true}
              zIndex={1000}
              overlayProps={{ radius: "lg", blur: 1 }}
              loaderProps={{ color: "blue", type: "bars", size: "sm" }}
            />
          </Box>
        ));

    // Check if current page data exists
    const currentPageData = data[activePage - 1];
    if (!currentPageData) return null;

    return currentPageData.map((mvp, i) => (
      <MvpCard key={mvp.Id ?? `mvp-${i}`} mvp={mvp} />
    ));
  }, [data, activePage, mvps.length, perPage]);

  return (
    <div className={style.cardContainer} style={{ width: "100%" }}>
      {items}
      {/* Loader indicator for infinite scroll */}
      <div ref={loadMoreRef} style={{ height: "20px" }} />
    </div>
  );
};
