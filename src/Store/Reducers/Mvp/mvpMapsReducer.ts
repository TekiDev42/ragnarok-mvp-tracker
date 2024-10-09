import {PayloadAction} from "@reduxjs/toolkit"
import {getMvpIndex} from "@utils/getMvpIndex.ts"
import {sortMvps} from "@utils/Sort/sortMvps.ts"
import {makeClones} from "@utils/makeClones.ts"

/**
 * Reducer function to update the maps data for a specific MVP.
 * 
 * This function updates the maps data of a specific MVP in the state.
 * It also ensures that the MVP lists are sorted after the update.
 * 
 * @param state - The current MVP state.
 * @param action - The action containing the MVP to update and the new maps data.
 * 
 * @example
 * // Assuming we have an MVP with id 1 and we want to update its maps data:
 * const action = {
 *   type: 'mvp/updateMaps',
 *   payload: {
 *     mvp: { id: 1, name: 'Eddga', mvpMaps: [...], ... },
 *     newMapsData: [
 *       { mapName: 'pay_fild10', respawnTime: 7200000, ... },
 *       { mapName: 'pay_fild11', respawnTime: 7200000, ... }
 *     ]
 *   }
 * }
 * mvpMapsReducer(currentState, action)
 * // This will update the MVP with id 1 to have the new maps data
 * // and re-sort the MVP lists in the state.
 */
export const mvpMapsReducer = (state: MvpState, action: PayloadAction<{mvp: Mvp, newMapsData: MvpMap[]}>) => {
    const mvpIndex = getMvpIndex(state.mvps, action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps, action.payload.mvp)

    newMvp.mvpMaps = action.payload.newMapsData
    newMvpList[mvpIndex] = newMvp

    const mvpsSorted = sortMvps(newMvpList)

    state.filtered = mvpsSorted
    state.mvps = mvpsSorted

    window.mvpApi.updateMvp(newMvp)
}