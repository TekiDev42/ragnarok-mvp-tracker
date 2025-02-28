import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { bookmarkReducer } from "@store/Reducers/Mvp/bookmarkReducer"
import { mvpMapsReducer } from "@store/Reducers/Mvp/mvpMapsReducer"
import { reSortMvpReducer } from "@store/Reducers/Mvp/reSortMvpReducer"
import { filterByNameOrIdReducer } from "@store/Reducers/Mvp/filterByNameOrIdReducer"
import { resetReducer } from "@store/Reducers/Mvp/resetReducer"

/**
 * Initial state for the MVP slice
 */
const initialState: MvpState = {
    mvps: [],
    filtered: [],
}

/**
 * Redux slice for managing MVP state
 */
export const Slice = createSlice({
    name: "mvp",
    initialState,
    reducers: {
        /**
         * Sets the MVPs in the state
         * @param state - The current state
         * @param action - The action containing the new MVPs
         * 
         * @example
         * dispatch(setMvps([
         *   { id: 1, name: "Eddga", isBookmark: false },
         *   { id: 2, name: "Osiris", isBookmark: true }
         * ]))
         */
        setMvps: (state, action: PayloadAction<Mvp[]>) => {
            state.mvps = action.payload
        },
        setMvpBookmarkStatus: bookmarkReducer,
        setMvpMaps: mvpMapsReducer,
        reSortMvp: reSortMvpReducer,
        filterByNameOrId: filterByNameOrIdReducer,
        reset: resetReducer
    }
})

/**
 * Action creators for the MVP slice
 * 
 * @example
 * // To set MVP bookmark status
 * dispatch(setMvpBookmarkStatus({ id: 1, isBookmark: true }))
 * 
 * // To filter MVPs by name or id
 * dispatch(filterByNameOrId("Eddga"))
 * 
 * // To re-sort MVPs
 * dispatch(reSortMvp())
 * 
 * // To reset the MVP state
 * dispatch(reset())
 * 
 * // To set MVP maps
 * dispatch(setMvpMaps({ id: 1, maps: ["pay_fild10"] }))
 * 
 * // To set all MVPs
 * dispatch(setMvps([{ id: 1, name: "Eddga" }, { id: 2, name: "Osiris" }]))
 */
export const { setMvpBookmarkStatus, filterByNameOrId, reSortMvp, reset, setMvpMaps, setMvps } = Slice.actions

export default Slice.reducer