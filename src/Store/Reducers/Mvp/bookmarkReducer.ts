import {PayloadAction} from "@reduxjs/toolkit";
import {getMvpIndex} from "@utils/getMvpIndex.ts";
import {sortMvps} from "@utils/Sort/sortMvps.ts";
import {makeClones} from "@utils/makeClones.ts";

export const bookmarkReducer = (state: MvpState, action: PayloadAction<{mvp: Mvp, bookmark: boolean}>) => {
    const mvpIndex = getMvpIndex(state.mvps, action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps, action.payload.mvp)

    newMvp.isBookmark = action.payload.bookmark
    newMvpList[mvpIndex] = newMvp

    const mvpsSorted = sortMvps(newMvpList)

    state.filtered = mvpsSorted
    state.mvps = mvpsSorted

    window.mvpApi.updateMvp(newMvp)
}