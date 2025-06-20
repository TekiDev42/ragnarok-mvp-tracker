import { PayloadAction } from "@reduxjs/toolkit"

/**
 * Reducer function to set the sound notification state and update settings.
 * 
 * @param {UserState} state - The current user state.
 * @param {PayloadAction<boolean>} action - The action containing the new sound notification value.
 */
export const setSoundNotificationReducer = (state: UserState, action: PayloadAction<boolean>) => {
    state.soundNotification = action.payload
    window.mvpApi.setSettings('soundNotification', action.payload)
}