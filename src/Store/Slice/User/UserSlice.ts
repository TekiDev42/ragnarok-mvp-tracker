import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {resetReducer} from "@store/Reducers/User/resetReducer";
import {setBackgroundReducer} from "@store/Reducers/User/setBackgroundReducer";
import {setAnimationReducer} from "@store/Reducers/User/setAnimationReducer";
import {setSoundNotificationReducer} from "@store/Reducers/User/setSoundNotificationReducer.ts";
import {setDelayNotificationReducer} from "@store/Reducers/User/setDelayNotificationReducer";
import {setPerPageReducer} from "@store/Reducers/User/setPerPageReducer.ts";
import {setRespawnTimerReducer} from "@store/Reducers/User/setRespawnTimerReducer.ts";
import {defaultSettings} from "@constants/defaults.ts";


const initialState: UserState = {
    ...defaultSettings,
    activePage: 1
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Settings>) => {
            state.animation = action.payload.animation
            state.background = action.payload.background
            state.soundNotification = action.payload.soundNotification
            state.delayNotification = action.payload.delayNotification
            state.respawnTimer = action.payload.respawnTimer
            state.perPage = action.payload.perPage
        },
        setActivePage: (state, action: PayloadAction<number>) => {
            state.activePage = action.payload
        },
        setBackground: setBackgroundReducer,
        setAnimation: setAnimationReducer,
        setSoundNotification: setSoundNotificationReducer,
        setDelayNotification: setDelayNotificationReducer,
        setPerPage: setPerPageReducer,
        setRespawnTimer: setRespawnTimerReducer,
        reset: resetReducer,
    }
})


export const {setAnimation, setBackground, setPerPage, setRespawnTimer, setSettings} = userSlice.actions
export const {setActivePage, setSoundNotification, setDelayNotification, reset} = userSlice.actions

export default userSlice.reducer