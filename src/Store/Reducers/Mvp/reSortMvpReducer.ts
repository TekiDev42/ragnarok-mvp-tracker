import { sortMvps } from "@utils/Sort/sortMvps.ts"
import { CaseReducer } from "@reduxjs/toolkit"
import { WritableDraft } from "immer"

export const reSortMvpReducer: CaseReducer<MvpState> = (state) => {
    state.filtered = sortMvps(state.filtered as Mvp[]) as WritableDraft<Mvp>[]
    state.mvps = sortMvps(state.mvps as Mvp[]) as WritableDraft<Mvp>[]
}