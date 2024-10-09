import {sortMvps} from "@utils/Sort/sortMvps.ts"

/**
 * Reducer function to re-sort the MVP lists in the state.
 * 
 * This function applies the sortMvps function to both the filtered and main MVP lists
 * in the state, ensuring that they are always properly sorted.
 * 
 * @param state - The current MVP state to be re-sorted.
 * 
 * @example
 * // Assuming we have a current state with unsorted MVP lists:
 * const currentState = {
 *   filtered: [
 *     { id: 2, name: 'Baphomet', respawnTime: 7200000 },
 *     { id: 1, name: 'Eddga', respawnTime: 3600000 }
 *   ],
 *   mvps: [
 *     { id: 3, name: 'Osiris', respawnTime: 3600000 },
 *     { id: 1, name: 'Eddga', respawnTime: 3600000 },
 *     { id: 2, name: 'Baphomet', respawnTime: 7200000 }
 *   ]
 * }
 * 
 * reSortMvpReducer(currentState)
 * // This will update the state to:
 * // {
 * //   filtered: [
 * //     { id: 1, name: 'Eddga', respawnTime: 3600000 },
 * //     { id: 2, name: 'Baphomet', respawnTime: 7200000 }
 * //   ],
 * //   mvps: [
 * //     { id: 1, name: 'Eddga', respawnTime: 3600000 },
 * //     { id: 3, name: 'Osiris', respawnTime: 3600000 },
 * //     { id: 2, name: 'Baphomet', respawnTime: 7200000 }
 * //   ]
 * // }
 * // The exact order may vary depending on the sorting criteria in sortMvps function.
 */
export const reSortMvpReducer = (state: MvpState) => {
    state.filtered = sortMvps(state.filtered)
    state.mvps = sortMvps(state.mvps)
}