import {PayloadAction} from "@reduxjs/toolkit";
import {filterMvpsByNameOrId} from "@utils/filterByNameOrId.ts";

export const filterByNameOrIdReducer = (state: MvpState, action: PayloadAction<string>) => {
    state.filtered = filterMvpsByNameOrId(state.mvps, action.payload)
}