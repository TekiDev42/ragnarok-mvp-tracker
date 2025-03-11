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
        setMvpsFromDb: (state, action: PayloadAction<any>) => {

            const newMvps = [...state.mvps]

            for (const db_map of action.payload.maps_party) {
                const mvpIndex = newMvps.findIndex((mvp) => mvp.Id === db_map.mvp_id)

                if (mvpIndex !== -1) {
                    newMvps[mvpIndex].mvpMaps = newMvps[mvpIndex].mvpMaps?.map((map) => {
                        if (map.name === db_map.map_name) {
                            return {
                                ...map,
                                deathTime: db_map.death_time,
                                tombPos: {
                                    x: db_map.tomb_pos_x,
                                    y: db_map.tomb_pos_y
                                }
                            }
                        }
                        return map
                    })
                }
            }

            state.filtered = newMvps as WritableDraft<Mvp>[]
            state.mvps = newMvps as WritableDraft<Mvp>[]
        },
        filterByNameOrId: filterByNameOrIdReducer,
        reset: resetReducer
    }
})


export const { setMvpBookmarkStatus, filterByNameOrId, reSortMvp, reset, setMvpMaps, setMvps, setMvpsFromDb } = Slice.actions

export default Slice.reducer