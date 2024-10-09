import {PayloadAction} from "@reduxjs/toolkit"
import {filterMvpsByNameOrId} from "@utils/filterByNameOrId.ts"

/**
 * Reducer function to filter MVPs by name or ID.
 * 
 * This function updates the filtered list of MVPs in the state based on a search string.
 * It uses the filterMvpsByNameOrId utility function to perform the filtering.
 * 
 * @param state - The current MVP state.
 * @param action - The action containing the search string.
 * 
 * @example
 * // Assuming we have a list of MVPs and we want to filter them by the name "Eddga":
 * const action = {
 *   type: 'mvp/filterByNameOrId',
 *   payload: 'Eddga'
 * }
 * filterByNameOrIdReducer(currentState, action)
 * // This will update state.filtered to contain only MVPs whose name or ID matches 'Eddga'
 */
export const filterByNameOrIdReducer = (state: MvpState, action: PayloadAction<string>) => {
    state.filtered = filterMvpsByNameOrId(state.mvps, action.payload)
}