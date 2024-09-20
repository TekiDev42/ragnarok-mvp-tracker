import {defaultMvps} from "@constants/defaultMvps.ts";
import {sortMvps} from "@utils/Sort/sortMvps.ts";

export const resetReducer = (state: MvpState) => {
    const mvpsSorted = sortMvps(defaultMvps)

    state.filtered = mvpsSorted
    state.mvps = mvpsSorted

    window.mvpApi.setMvps(mvpsSorted)
}