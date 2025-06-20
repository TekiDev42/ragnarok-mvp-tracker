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