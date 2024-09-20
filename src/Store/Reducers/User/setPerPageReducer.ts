import {PayloadAction} from "@reduxjs/toolkit";
import {defaultMvps} from "@constants/defaultMvps.ts";

export const setPerPageReducer = (state: UserState, action: PayloadAction<string>) => {
    let perPage = parseInt(action.payload)

    if(action.payload === 'All'){
        state.perPage = defaultMvps.length
        perPage = defaultMvps.length
    }

    window.mvpApi.setSettings('perPage', perPage)
    state.perPage = perPage
}