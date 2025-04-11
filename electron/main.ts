import {MvpApp} from "./classes/MvpApp.ts";

import {updateElectronApp, UpdateSourceType } from 'update-electron-app'

updateElectronApp({
    updateSource: {
        type: UpdateSourceType.ElectronPublicUpdateService,
        repo: 'TekiDev42/ragnarok-mvp-tracker'
    },
    updateInterval: '1 hour',
})

new MvpApp()