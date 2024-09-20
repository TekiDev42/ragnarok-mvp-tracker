import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalState {
    mvp: Mvp
    opened: boolean
}

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

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setMvp: (state, action: PayloadAction<Mvp>) => {
            state.mvp = action.payload
        },
        setOpened: (state, action: PayloadAction<boolean>) => {
            state.opened = action.payload
        }
    }
})

export const {setMvp, setOpened} = modalSlice.actions

export default modalSlice.reducer