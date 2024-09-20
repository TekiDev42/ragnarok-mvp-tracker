import {PayloadAction} from "@reduxjs/toolkit";

export const setAnimationReducer = (state: UserState, action: PayloadAction<boolean>) => {
    state.animation = action.payload
    window.mvpApi.setSettings('animation', action.payload)
}