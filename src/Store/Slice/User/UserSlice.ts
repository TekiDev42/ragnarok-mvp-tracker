import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {resetReducer} from "@store/Reducers/User/resetReducer";
import {setBackgroundReducer} from "@store/Reducers/User/setBackgroundReducer";
import {setAnimationReducer} from "@store/Reducers/User/setAnimationReducer";
import {setSoundNotificationReducer} from "@store/Reducers/User/setSoundNotificationReducer.ts";
import {setDelayNotificationReducer} from "@store/Reducers/User/setDelayNotificationReducer";
import {setPerPageReducer} from "@store/Reducers/User/setPerPageReducer.ts";
import {setRespawnTimerReducer} from "@store/Reducers/User/setRespawnTimerReducer.ts";
import {defaultSettings} from "@constants/defaults.ts";
import {updateStorage} from "@utils/Storage/updateStorage.ts";

/**
 * Initial state for the user slice of the Redux store.
 * Includes default settings and sets the active page to 1.
 */
const initialState: UserState = {
    ...defaultSettings,
    activePage: 1
}

/**
 * Creates a slice for managing user-related state in the Redux store.
 */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * Updates all user settings at once.
         * @param {UserState} state - The current state.
         * @param {PayloadAction<Settings>} action - The action containing new settings.
         */
        setSettings: (state, action: PayloadAction<Settings>) => {
            state.animation = action.payload.animation
            state.background = action.payload.background
            state.soundNotification = action.payload.soundNotification
            state.delayNotification = action.payload.delayNotification
            state.respawnTimer = action.payload.respawnTimer
            state.perPage = action.payload.perPage

            updateStorage("respawnTimer", action.payload.respawnTimer)
        },
        /**
         * Sets the active page number.
         * @param {UserState} state - The current state.
         * @param {PayloadAction<number>} action - The action containing the new page number.
         */
        setActivePage: (state, action: PayloadAction<number>) => {
            state.activePage = action.payload
        },
        /**
         * Sets the background setting.
         */
        setBackground: setBackgroundReducer,
        /**
         * Sets the animation setting.
         */
        setAnimation: setAnimationReducer,
        /**
         * Sets the sound notification setting.
         */
        setSoundNotification: setSoundNotificationReducer,
        /**
         * Sets the delay notification setting.
         */
        setDelayNotification: setDelayNotificationReducer,
        /**
         * Sets the number of items per page.
         */
        setPerPage: setPerPageReducer,
        /**
         * Sets the respawn timer.
         */
        setRespawnTimer: setRespawnTimerReducer,
        /**
         * Resets the user settings to default values.
         */
        reset: resetReducer,
    }
})

// Export individual action creators
export const {setAnimation, setBackground, setPerPage, setRespawnTimer, setSettings} = userSlice.actions
export const {setActivePage, setSoundNotification, setDelayNotification, reset} = userSlice.actions

// Export the reducer
export default userSlice.reducer