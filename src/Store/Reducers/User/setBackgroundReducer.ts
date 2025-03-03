import {PayloadAction} from "@reduxjs/toolkit"

/**
 * Reducer function to update the background setting in the user state.
 * 
 * This function updates the background setting in the state and persists
 * the change using the mvpApi.
 */
export const setBackgroundReducer = (state: UserState, action: PayloadAction<string>) => {
    state.background = action.payload
    window.mvpApi.setSettings('background', action.payload)
}