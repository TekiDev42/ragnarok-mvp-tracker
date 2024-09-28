import {sortMvpMap} from "@utils/Sort/SortMvpMap.ts";
import {sortMvp} from "@utils/Sort/sortMvp.ts";

/**
 * Sorts a list of MVPs and their associated maps.
 * 
 * This function performs two levels of sorting:
 * 1. It sorts the maps within each MVP using the sortMvpMap function.
 * 2. It then sorts the MVPs themselves using the sortMvp function.
 * 
 * @param {Mvp[]} mvpsList - An array of MVP objects to be sorted.
 * @returns {Mvp[]} A new array of sorted MVP objects.
 */
export const sortMvps = (mvpsList: Mvp[]): Mvp[] => {
    return mvpsList.map(mvp => ({
        ...mvp,
        mvpMaps: [...mvp.mvpMaps].sort(sortMvpMap)
    })).sort(sortMvp);
};