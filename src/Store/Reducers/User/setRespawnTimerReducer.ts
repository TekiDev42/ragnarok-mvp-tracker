import {PayloadAction} from "@reduxjs/toolkit"
import { updateStorage } from "@utils/Storage/updateStorage.ts"
/**
 * Reducer function to update the respawn timer setting in the user state.
 * 
 * This function updates the respawn timer setting in the state and persists
 * the change using the mvpApi.
 */
export const setRespawnTimerReducer = (state: UserState, action: PayloadAction<number>) => {
    state.respawnTimer = action.payload
    window.mvpApi.setSettings('respawnTimer', action.payload)
    updateStorage('respawnTimer', action.payload)
}