import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { WritableDraft } from "immer"
/**
 * Interface representing the state of the modal.
 */
interface DeathFormModalState {
    /** The MVP (Most Valuable Player) data */
    mvp: Mvp
    /** Boolean indicating if the modal is opened */
    opened: boolean
}

/**
 * Initial state for the modal slice.
 */
const initialState: DeathFormModalState = {
    mvp: {
        Id: 0,
        AegisName: "",
        Name: "",
        image: "",
        isBookmark: false,
        mvpMaps: []
    },
    opened: false
}

/**
 * Redux slice for managing modal state.
 */
export const deathFormModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setDeathMvp: (state, action: PayloadAction<Mvp>) => {
            state.mvp = action.payload as WritableDraft<Mvp>
        },
        setOpened: (state, action: PayloadAction<boolean>) => {
            state.opened = action.payload
        }
    }
})

export const {setDeathMvp, setOpened} = deathFormModalSlice.actions

export default deathFormModalSlice.reducer