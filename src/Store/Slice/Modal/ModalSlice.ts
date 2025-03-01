import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { WritableDraft } from "immer"
/**
 * Interface representing the state of the modal.
 */
interface ModalState {
    /** The MVP (Most Valuable Player) data */
    mvp: Mvp
    /** Boolean indicating if the modal is opened */
    opened: boolean
}

/**
 * Initial state for the modal slice.
 */
const initialState: ModalState = {
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
export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        /**
         * Sets the MVP data in the state.
         * @param state - The current state.
         * @param action - The action containing the new MVP data.
         * 
         * @example
         * dispatch(setMvp({
         *   Id: 1,
         *   AegisName: "EDDGA",
         *   Name: "Eddga",
         *   image: "eddga.png",
         *   isBookmark: true,
         *   mvpMaps: ["pay_fild10"]
         * }))
         */
        setMvp: (state, action: PayloadAction<Mvp>) => {
            state.mvp = action.payload as WritableDraft<Mvp>
        },
        /**
         * Sets the opened state of the modal.
         * @param state - The current state.
         * @param action - The action containing the new opened state.
         * 
         * @example
         * dispatch(setOpened(true)) // Opens the modal
         * dispatch(setOpened(false)) // Closes the modal
         */
        setOpened: (state, action: PayloadAction<boolean>) => {
            state.opened = action.payload
        }
    }
})

export const {setMvp, setOpened} = modalSlice.actions

export default modalSlice.reducer