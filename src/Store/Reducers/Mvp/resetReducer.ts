import {defaultMvps} from "@constants/defaultMvps.ts"
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { sortMvps } from "@utils/Sort/sortMvps";


export const resetReducer: CaseReducer<MvpState> = (state) => {

    const sortedDefaultMvps = sortMvps(defaultMvps as Mvp[])

    state.filtered = sortedDefaultMvps as WritableDraft<Mvp>[]
    state.mvps = sortedDefaultMvps as WritableDraft<Mvp>[]

    window.mvpApi.setMvps(defaultMvps)
}