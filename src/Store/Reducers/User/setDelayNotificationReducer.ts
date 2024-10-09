import {PayloadAction} from "@reduxjs/toolkit"

/**
 * Reducer function to update the delay notification setting in the user state.
 * 
 * This function updates the delay notification setting in the state and persists
 * the change using the mvpApi.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new delay notification value.
 * 
 * @example
 * // Assuming we have a current state with a delay notification of 0:
 * const currentState = {
 *   delayNotification: 0,
 *   // ... other user settings
 * }
 * 
 * // To change the delay notification to 5 minutes:
 * const action = {
 *   type: 'user/setDelayNotification',
 *   payload: 5
 * }
 * 
 * setDelayNotificationReducer(currentState, action)
 * // This will update the state to:
 * // {
 * //   delayNotification: 5,
 * //   // ... other user settings remain unchanged
 * // }
 * // And also update this setting in the persistent storage using window.mvpApi.setSettings()
 */
export const setDelayNotificationReducer = (state: UserState, action: PayloadAction<number>) => {
    state.delayNotification = action.payload
    window.mvpApi.setSettings('delayNotification', action.payload)
}