import {PayloadAction} from "@reduxjs/toolkit";

export const setSoundNotificationReducer = (state: UserState, action: PayloadAction<boolean>) => {
    state.soundNotification = action.payload
    window.mvpApi.setSettings('soundNotification', action.payload)
}