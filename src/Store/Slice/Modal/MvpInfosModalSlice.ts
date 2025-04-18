import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { WritableDraft } from "immer"
/**
 * Interface representing the state of the modal.
 */
interface MvpInfosModalState {
    /** The MVP (Most Valuable Player) data */
    mvp: Mvp | null
}

/**
 * Initial state for the modal slice.
 */
const initialState: MvpInfosModalState = {
    mvp: null,
}

/**
 * Redux slice for managing modal state.
 */
export const mvpInfosModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setMvpInfosModal: (state, action: PayloadAction<Mvp | null>) => {
            state.mvp = action.payload as WritableDraft<Mvp | null>
        },
    }
})

export const {setMvpInfosModal} = mvpInfosModalSlice.actions

export default mvpInfosModalSlice.reducer