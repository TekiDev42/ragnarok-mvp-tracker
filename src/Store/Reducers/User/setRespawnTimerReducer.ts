import {PayloadAction} from "@reduxjs/toolkit"

/**
 * Reducer function to update the respawn timer setting in the user state.
 * 
 * This function updates the respawn timer setting in the state and persists
 * the change using the mvpApi.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new respawn timer value.
 * 
 * @example
 * // Assuming we have a current state with a respawn timer of 0:
 * const currentState = {
 *   respawnTimer: 0,
 *   // ... other user settings
 * }
 * 
 * // To change the respawn timer to 5 minutes:
 * const action = {
 *   type: 'user/setRespawnTimer',
 *   payload: 5
 * }
 * 
 * setRespawnTimerReducer(currentState, action)
 * // This will update the state to:
 * // {
 * //   respawnTimer: 5,
 * //   // ... other user settings remain unchanged
 * // }
 * // And also update this setting in the persistent storage using window.mvpApi.setSettings()
 */
export const setRespawnTimerReducer = (state: UserState, action: PayloadAction<number>) => {
    state.respawnTimer = action.payload
    window.mvpApi.setSettings('respawnTimer', action.payload)
}