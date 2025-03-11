import {defaultMvps} from "@constants/defaultMvps.ts"
import { CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

/**
 * Reducer function to reset the MVP state to its default values.
 * 
 * This function resets both the filtered and main MVP lists to the default MVPs,
 * sorts them, and updates the state accordingly. It also persists the changes
 * using the mvpApi.
 * 
 * @param state - The current MVP state to be reset.
 * 
 * @example
 * // Assuming we have a current state with modified MVP data:
 * const currentState = {
 *   filtered: [{ id: 1, name: 'Modified Eddga', ... }],
 *   mvps: [{ id: 1, name: 'Modified Eddga', ... }]
 * }
 * 
 * resetReducer(currentState)
 * // This will reset the state to:
 * // {
 * //   filtered: [{ id: 1, name: 'Eddga', ... }, ...], // sorted default MVPs
 * //   mvps: [{ id: 1, name: 'Eddga', ... }, ...] // sorted default MVPs
 * // }
 * // And also update the persisted MVPs using window.mvpApi.setMvps()
 */
export const resetReducer: CaseReducer<MvpState> = (state) => {
    state.filtered = defaultMvps as WritableDraft<Mvp>[]
    state.mvps = defaultMvps as WritableDraft<Mvp>[]

    window.mvpApi.setMvps(defaultMvps)
}