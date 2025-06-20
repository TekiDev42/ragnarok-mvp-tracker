import {PayloadAction} from "@reduxjs/toolkit";
/**
 * Reducer function to update the animation setting in the user state.
 * 
 * This function updates the animation setting in the state and persists
 * the change using the mvpApi.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new animation setting value.
 */

export const setAnimationReducer = (state: UserState, action: PayloadAction<boolean>) => {
    state.animation = action.payload
    window.mvpApi.setSettings('animation', action.payload)
}