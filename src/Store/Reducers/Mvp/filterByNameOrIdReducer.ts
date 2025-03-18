import {filterMvpsByNameOrId} from "@utils/filterByNameOrId.ts"
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

export const filterByNameOrIdReducer: CaseReducer<MvpState> = (state) => {
    state.filtered = filterMvpsByNameOrId(state.mvps as Mvp[], state.search) as WritableDraft<Mvp>[]
}