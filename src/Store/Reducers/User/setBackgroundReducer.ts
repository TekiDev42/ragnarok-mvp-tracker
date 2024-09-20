import {PayloadAction} from "@reduxjs/toolkit";

export const setBackgroundReducer = (state: UserState, action: PayloadAction<string>) => {
    state.background = action.payload
    window.mvpApi.setSettings('background', action.payload)
}