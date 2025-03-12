import {PayloadAction} from "@reduxjs/toolkit";
import {getMvpIndex} from "@utils/getMvpIndex.ts";
import {makeClones} from "@utils/makeClones.ts";
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { sortMvps } from "@utils/Sort/sortMvps";


export const bookmarkReducer: CaseReducer<MvpState, PayloadAction<{mvp: Mvp, bookmark: boolean}>> = (state, action) => {
    const mvpIndex = getMvpIndex(state.mvps as Mvp[], action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps as Mvp[], action.payload.mvp)

    newMvp.isBookmark = action.payload.bookmark
    newMvpList[mvpIndex] = newMvp

    const sortedMvpList = sortMvps(newMvpList as Mvp[])

    state.filtered = sortedMvpList as WritableDraft<Mvp>[]
    state.mvps = sortedMvpList as WritableDraft<Mvp>[]

    window.mvpApi.updateMvp(newMvp)
}