import {PayloadAction} from "@reduxjs/toolkit"

/**
 * Reducer function to update the background setting in the user state.
 * 
 * This function updates the background setting in the state and persists
 * the change using the mvpApi.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new background setting value.
 * 
 * @example
 * // Assuming we have a current state with a default background:
 * const currentState = {
 *   background: 'default-background.jpg',
 *   // ... other user settings
 * }
 * 
 * // To change the background:
 * const action = {
 *   type: 'user/setBackground',
 *   payload: 'new-background.png'
 * }
 * 
 * setBackgroundReducer(currentState, action)
 * // This will update the state to:
 * // {
 * //   background: 'new-background.png',
 * //   // ... other user settings remain unchanged
 * // }
 * // And also update this setting in the persistent storage using window.mvpApi.setSettings()
 */
export const setBackgroundReducer = (state: UserState, action: PayloadAction<string>) => {
    state.background = action.payload
    window.mvpApi.setSettings('background', action.payload)
}