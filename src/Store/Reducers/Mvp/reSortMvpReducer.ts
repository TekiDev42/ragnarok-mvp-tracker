import {sortMvps} from "@utils/Sort/sortMvps.ts";

export const reSortMvpReducer = (state: MvpState) => {
    state.filtered = sortMvps(state.filtered)
    state.mvps = sortMvps(state.mvps)
}