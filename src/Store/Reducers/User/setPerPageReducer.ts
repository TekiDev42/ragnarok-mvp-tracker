import {PayloadAction} from "@reduxjs/toolkit"
import {defaultMvps} from "@constants/defaultMvps.ts"

/**
 * Reducer function to update the number of items per page in the user state.
 * 
 * This function updates the 'perPage' setting in the state and persists
 * the change using the mvpApi. If the action payload is 'All', it sets
 * the perPage value to the total number of default MVPs.
 * 
 * @param state - The current UserState.
 * @param action - The action containing the new perPage value as a string.
 * 
 * @example
 * // Assuming we have a current state with perPage set to 12:
 * const currentState = {
 *   perPage: 12,
 *   // ... other user settings
 * }
 * 
 * // To change perPage to 20:
 * const action = {
 *   type: 'user/setPerPage',
 *   payload: '20'
 * }
 * 
 * setPerPageReducer(currentState, action)
 * // This will update the state to:
 * // {
 * //   perPage: 20,
 * //   // ... other user settings remain unchanged
 * // }
 * 
 * // To set perPage to show all MVPs:
 * const allAction = {
 *   type: 'user/setPerPage',
 *   payload: 'All'
 * }
 * 
 * setPerPageReducer(currentState, allAction)
 * // This will update the state to:
 * // {
 * //   perPage: defaultMvps.length,
 * //   // ... other user settings remain unchanged
 * // }
 * 
 * // In both cases, the setting is also updated in the persistent storage using window.mvpApi.setSettings()
 */
export const setPerPageReducer = (state: UserState, action: PayloadAction<string>) => {
    let perPage = parseInt(action.payload)

    if(action.payload === 'All'){
        state.perPage = defaultMvps.length
        perPage = defaultMvps.length
    }

    window.mvpApi.setSettings('perPage', perPage)
    state.perPage = perPage
}