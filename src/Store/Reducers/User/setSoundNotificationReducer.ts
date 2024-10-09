import { PayloadAction } from "@reduxjs/toolkit"

/**
 * Reducer function to set the sound notification state and update settings.
 * 
 * @param {UserState} state - The current user state.
 * @param {PayloadAction<boolean>} action - The action containing the new sound notification value.
 * 
 * @example
 * // Assuming we have a slice with this reducer:
 * const userSlice = createSlice({
 *   name: 'user',
 *   initialState: { soundNotification: false },
 *   reducers: {
 *     setSoundNotification: setSoundNotificationReducer
 *   }
 * })
 * 
 * // Usage in a component:
 * dispatch(userSlice.actions.setSoundNotification(true))
 * // This will update the state and call window.mvpApi.setSettings
 */
export const setSoundNotificationReducer = (state: UserState, action: PayloadAction<boolean>) => {
    state.soundNotification = action.payload
    window.mvpApi.setSettings('soundNotification', action.payload)
}