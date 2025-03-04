import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {resetReducer} from "@store/Reducers/User/resetReducer"
import {setBackgroundReducer} from "@store/Reducers/User/setBackgroundReducer"
import {setAnimationReducer} from "@store/Reducers/User/setAnimationReducer"
import {setSoundNotificationReducer} from "@store/Reducers/User/setSoundNotificationReducer.ts"
import {setDelayNotificationReducer} from "@store/Reducers/User/setDelayNotificationReducer"
import {setPerPageReducer} from "@store/Reducers/User/setPerPageReducer.ts"
import {setRespawnTimerReducer} from "@store/Reducers/User/setRespawnTimerReducer.ts"
import {defaultSettings} from "@constants/defaults.ts"

/**
 * Initial state for the user slice of the Redux store.
 * Includes default settings and sets the active page to 1.
 */
const initialState: UserState = {
    ...defaultSettings,
    activePage: 1,
    cardRates: 1,
    rates: 1,
    notificationVolume: 100,
    notifications: []
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
         */
        setSettings: (state, action: PayloadAction<UserState>) => {
            state.animation = action.payload.animation
            state.background = action.payload.background
            state.soundNotification = action.payload.soundNotification
            state.delayNotification = action.payload.delayNotification
            state.respawnTimer = action.payload.respawnTimer
            state.perPage = action.payload.perPage
            state.cardRates = action.payload.cardRates
            state.rates = action.payload.rates
            state.notificationVolume = action.payload.notificationVolume
            state.notifications = action.payload.notifications
        },
        /**
         * Sets the active page number.
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
        /**
         * Sets the card rates.
         */
        setCardRates: (state, action: PayloadAction<number>) => {
            state.cardRates = action.payload
            window.mvpApi.setSettings('cardRates', action.payload)
        },

        /**
         * Sets the rates.
         */
        setRates: (state, action: PayloadAction<number>) => {
            state.rates = action.payload
            window.mvpApi.setSettings('rates', action.payload)
        },

        /**
         * Sets the notification volume.
         */
        setNotificationVolume: (state, action: PayloadAction<number>) => {
            state.notificationVolume = action.payload
            window.mvpApi.setSettings('notificationVolume', action.payload)
        },

        /**
         * Sets the notifications.
         */
        addNotification: (state, action: PayloadAction<MvpNotification>) => {
            state.notifications.unshift(action.payload)
            if (state.notifications.length > 20) {
                state.notifications.pop()
            }
            window.mvpApi.addNotification({...action.payload})
        },

        /**
         * Removes a notification.
         */
        removeNotification: (state, action: PayloadAction<MvpNotification>) => {
            state.notifications = state.notifications.filter(notification => notification.mvpName !== action.payload.mvpName)
            window.mvpApi.removeNotification(action.payload)
        },

        /**
         * Clears all notifications.
         */
        clearNotifications: (state) => {
            state.notifications = []
            window.mvpApi.clearNotifications()
        }
    }
})

// Export individual action creators
export const {setAnimation, setBackground, setPerPage, setRespawnTimer, setSettings, setCardRates, setRates, setNotificationVolume} = userSlice.actions
export const {addNotification, removeNotification, clearNotifications} = userSlice.actions
export const {setActivePage, setSoundNotification, setDelayNotification, reset} = userSlice.actions

// Export the reducer
export default userSlice.reducer