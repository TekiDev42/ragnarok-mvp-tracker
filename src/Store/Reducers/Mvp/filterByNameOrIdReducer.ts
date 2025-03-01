import {PayloadAction} from "@reduxjs/toolkit"
import {filterMvpsByNameOrId} from "@utils/filterByNameOrId.ts"
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

export const filterByNameOrIdReducer: CaseReducer<MvpState, PayloadAction<string>> = (state, action) => {
    state.filtered = filterMvpsByNameOrId(state.mvps as Mvp[], action.payload) as WritableDraft<Mvp>[]
}