import {PayloadAction} from "@reduxjs/toolkit"
import {getMvpIndex} from "@utils/getMvpIndex.ts"
import {makeClones} from "@utils/makeClones.ts"
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { sortMvps } from "@utils/Sort/sortMvps";


export const mvpMapsReducer: CaseReducer<MvpState, PayloadAction<{mvp: Mvp, newMapsData: MvpMap[]}>> = (state, action) => {
    const mvpIndex = getMvpIndex(state.mvps as Mvp[], action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps as Mvp[], action.payload.mvp)

    newMvp.mvpMaps = action.payload.newMapsData
    newMvpList[mvpIndex] = newMvp

    const sortedMvpList = sortMvps(newMvpList as Mvp[])

    state.filtered = sortedMvpList as WritableDraft<Mvp>[]
    state.mvps = sortedMvpList as WritableDraft<Mvp>[]

    window.mvpApi.updateMvp(newMvp)
}