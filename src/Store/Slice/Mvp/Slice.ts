import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { bookmarkReducer } from "@store/Reducers/Mvp/bookmarkReducer"
import { mvpMapsReducer } from "@store/Reducers/Mvp/mvpMapsReducer"
import { resetReducer } from "@store/Reducers/Mvp/resetReducer"
import { reSortMvpReducer } from "@store/Reducers/Mvp/reSortMvpReducer"
import { WritableDraft } from "immer"
import { sortMvps } from "@utils/Sort/sortMvps"


/**
 * Initial state for the MVP slice
 */
const initialState: MvpState = {
    mvps: [],
    filtered: [],
    mvpFocus: null
}

/**
 * Redux slice for managing MVP state
 */
export const Slice = createSlice({
    name: "mvp",
    initialState,
    reducers: {
        setMvps: (state, action: PayloadAction<Mvp[]>) => {
            const sortedMvps = sortMvps(action.payload as Mvp[])

            state.mvps = sortedMvps as WritableDraft<Mvp>[]
            state.filtered = sortedMvps as WritableDraft<Mvp>[]

            if (window.mvpApi) {
                window.mvpApi.appLoaded()
            }
        },
        setMvpBookmarkStatus: bookmarkReducer,
        setMvpMaps: mvpMapsReducer,
        reSortMvp: reSortMvpReducer,
        setMvpsFromDb: (state, action: PayloadAction<any>) => {

            const newMvps = [...state.mvps]

            for (const db_map of action.payload) {
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

            const sortedMvps = sortMvps(newMvps as Mvp[])

            state.filtered = sortedMvps as WritableDraft<Mvp>[]
            state.mvps = sortedMvps as WritableDraft<Mvp>[]
        },
        reset: resetReducer,
        setMvpFocus: (state, action: PayloadAction<number | null>) => {
            state.mvpFocus = action.payload
        }
    }
})


export const { setMvpBookmarkStatus, reSortMvp, 
                reset, setMvpMaps, setMvps, setMvpsFromDb, setMvpFocus } = Slice.actions

export default Slice.reducer