import {PayloadAction} from "@reduxjs/toolkit";

export const setDelayNotificationReducer = (state: UserState, action: PayloadAction<number>) => {
    state.delayNotification = action.payload
    window.mvpApi.setSettings('delayNotification', action.payload)
}