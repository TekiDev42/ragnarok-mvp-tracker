import {PayloadAction} from "@reduxjs/toolkit";
import {getMvpIndex} from "@utils/getMvpIndex.ts";
import {sortMvps} from "@utils/Sort/sortMvps.ts";
import {makeClones} from "@utils/makeClones.ts";
/**
 * Reducer function to toggle the bookmark status of an MVP.
 * 
 * This function updates the bookmark status of a specific MVP in the state.
 * It also ensures that the MVP lists are sorted after the update.
 * 
 * @param state - The current MVP state.
 * @param action - The action containing the MVP to update and the new bookmark status.
 * 
 * @example
 * // Assuming we have an MVP with id 1 and we want to bookmark it:
 * const action = {
 *   type: 'mvp/bookmark',
 *   payload: {
 *     mvp: { id: 1, name: 'Eddga', isBookmark: false, ... },
 *     bookmark: true
 *   }
 * }
 * bookmarkReducer(currentState, action)
 * // This will update the MVP with id 1 to have isBookmark: true
 * // and re-sort the MVP lists in the state.
 */


export const bookmarkReducer = (state: MvpState, action: PayloadAction<{mvp: Mvp, bookmark: boolean}>) => {
    const mvpIndex = getMvpIndex(state.mvps, action.payload.mvp)
    const [newMvpList, newMvp] = makeClones(state.mvps, action.payload.mvp)

    newMvp.isBookmark = action.payload.bookmark
    newMvpList[mvpIndex] = newMvp

    const mvpsSorted = sortMvps(newMvpList)

    state.filtered = mvpsSorted
    state.mvps = mvpsSorted

    window.mvpApi.updateMvp(newMvp)
}