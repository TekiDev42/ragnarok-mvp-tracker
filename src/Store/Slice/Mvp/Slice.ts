import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { bookmarkReducer } from "@store/Reducers/Mvp/bookmarkReducer"
import { mvpMapsReducer } from "@store/Reducers/Mvp/mvpMapsReducer"
import { filterByNameOrIdReducer } from "@store/Reducers/Mvp/filterByNameOrIdReducer"
import { resetReducer } from "@store/Reducers/Mvp/resetReducer"
import { reSortMvpReducer } from "@store/Reducers/Mvp/reSortMvpReducer"
import { WritableDraft } from "immer"

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
        setMvps: (state, action: PayloadAction<Mvp[]>) => {
            state.mvps = action.payload as WritableDraft<Mvp>[]
        },
        setMvpBookmarkStatus: bookmarkReducer,
        setMvpMaps: mvpMapsReducer,
        reSortMvp: reSortMvpReducer,
        filterByNameOrId: filterByNameOrIdReducer,
        reset: resetReducer
    }
})


export const { setMvpBookmarkStatus, filterByNameOrId, reSortMvp, reset, setMvpMaps, setMvps } = Slice.actions

export default Slice.reducer