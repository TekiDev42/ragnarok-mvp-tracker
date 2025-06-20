import {PayloadAction} from "@reduxjs/toolkit"

/**
 * Reducer function to update the delay notification setting in the user state.
 * 
 * This function updates the delay notification setting in the state and persists
 * the change using the mvpApi.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new delay notification value.
 */
export const setDelayNotificationReducer = (state: UserState, action: PayloadAction<number>) => {
    state.delayNotification = action.payload
    window.mvpApi.setSettings('delayNotification', action.payload)
}