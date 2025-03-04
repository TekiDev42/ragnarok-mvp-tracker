import {PayloadAction} from "@reduxjs/toolkit"
import {getMvpIndex} from "@utils/getMvpIndex.ts"
import {sortMvps} from "@utils/Sort/sortMvps.ts"
import {makeClones} from "@utils/makeClones.ts"
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

export const mvpMapsReducer: CaseReducer<MvpState, PayloadAction<{mvp: Mvp, newMapsData: MvpMap[]}>> = (state, action) => {
    const mvpIndex = getMvpIndex(state.mvps as Mvp[], action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps as Mvp[], action.payload.mvp)

    newMvp.mvpMaps = action.payload.newMapsData
    newMvpList[mvpIndex] = newMvp

    const mvpsSorted = sortMvps(newMvpList)

    state.filtered = mvpsSorted as WritableDraft<Mvp>[]

    state.mvps = mvpsSorted as WritableDraft<Mvp>[]

    window.mvpApi.updateMvp(newMvp)
}