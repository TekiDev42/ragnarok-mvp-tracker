import {sortMvpMap} from "@utils/Sort/SortMvpMap.ts";
import {sortMvp} from "@utils/Sort/sortMvp.ts";

export const sortMvps = (mvpsList: Mvp[]) => {
    const clone = [...mvpsList]

    return clone.map(mvp => {
        const mapClone = [...mvp.mvpMaps]
        mvp.mvpMaps = mapClone.sort(sortMvpMap)

        return mvp
    }).sort(sortMvp)
}