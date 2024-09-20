import {PayloadAction} from "@reduxjs/toolkit";

export  const setRespawnTimerReducer = (state: UserState, action: PayloadAction<number>) => {
    state.respawnTimer = action.payload
    window.mvpApi.setSettings('respawnTimer', action.payload)
}