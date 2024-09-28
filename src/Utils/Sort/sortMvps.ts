import {sortMvpMap} from "@utils/Sort/SortMvpMap.ts";
import {sortMvp} from "@utils/Sort/sortMvp.ts";

export const sortMvps = (mvpsList: Mvp[]): Mvp[] => {
    return mvpsList.map(mvp => ({
        ...mvp,
        mvpMaps: [...mvp.mvpMaps].sort(sortMvpMap)
    })).sort(sortMvp);
};