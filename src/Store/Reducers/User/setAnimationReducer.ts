import {PayloadAction} from "@reduxjs/toolkit";
/**
 * Reducer function to update the animation setting in the user state.
 * 
 * This function updates the animation setting in the state and persists
 * the change using the mvpApi.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new animation setting value.
 * 
 * @example
 * // Assuming we have a current state with animation enabled:
 * const currentState = {
 *   animation: true,
 *   // ... other user settings
 * }
 * 
 * // To disable animation:
 * const action = {
 *   type: 'user/setAnimation',
 *   payload: false
 * }
 * 
 * setAnimationReducer(currentState, action)
 * // This will update the state to:
 * // {
 * //   animation: false,
 * //   // ... other user settings remain unchanged
 * // }
 * // And also update this setting in the persistent storage using window.mvpApi.setSettings()
 */

export const setAnimationReducer = (state: UserState, action: PayloadAction<boolean>) => {
    state.animation = action.payload
    window.mvpApi.setSettings('animation', action.payload)
}