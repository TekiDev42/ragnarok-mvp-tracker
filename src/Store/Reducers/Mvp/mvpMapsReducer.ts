import {PayloadAction} from "@reduxjs/toolkit";
import {getMvpIndex} from "@utils/getMvpIndex.ts";
import {sortMvps} from "@utils/Sort/sortMvps.ts";
import {makeClones} from "@utils/makeClones.ts";

export const mvpMapsReducer = (state: MvpState, action: PayloadAction<{mvp: Mvp, newMapsData: MvpMap[]}>) => {
    const mvpIndex = getMvpIndex(state.mvps, action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps, action.payload.mvp)

    newMvp.mvpMaps = action.payload.newMapsData
    newMvpList[mvpIndex] = newMvp

    const mvpsSorted = sortMvps(newMvpList)

    state.filtered = mvpsSorted
    state.mvps = mvpsSorted

    window.mvpApi.updateMvp(newMvp)
}