import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {bookmarkReducer} from "@store/Reducers/Mvp/bookmarkReducer";
import {mvpMapsReducer} from "@store/Reducers/Mvp/mvpMapsReducer";
import {reSortMvpReducer} from "@store/Reducers/Mvp/reSortMvpReducer";
import {filterByNameOrIdReducer} from "@store/Reducers/Mvp/filterByNameOrIdReducer";
import {resetReducer} from "@store/Reducers/Mvp/resetReducer";


const initialState: MvpState = {
    mvps: [],
    filtered: [],
}

export const Slice = createSlice({
    name: "mvp",
    initialState,
    reducers: {
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

export const {setMvpBookmarkStatus, filterByNameOrId, reSortMvp, reset, setMvpMaps, setMvps} = Slice.actions

export default Slice.reducer