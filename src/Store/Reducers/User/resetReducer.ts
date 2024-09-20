import {defaultBackground} from "@constants/defaults";

export const resetReducer = (state: UserState) => {
    state.animation = true
    state.background = defaultBackground
    state.soundNotification = true
    state.delayNotification = 0
    state.respawnTimer = 0
    state.perPage = 12

    window.mvpApi.setSettings('animation', state.animation)
    window.mvpApi.setSettings('background', state.background)
    window.mvpApi.setSettings('soundNotification', state.soundNotification)
    window.mvpApi.setSettings('delayNotification', state.delayNotification)
    window.mvpApi.setSettings('respawnTimer', state.respawnTimer)
    window.mvpApi.setSettings('perPage', state.perPage)
}