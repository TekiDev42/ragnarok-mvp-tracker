import {MvpApp} from "./classes/MvpApp.ts";

import { app, autoUpdater, dialog } from 'electron'

const server = 'https://github.com/TekiDev42/ragnarok-mvp-tracker'
const feed = `${server}/releases/tag/v${app.getVersion()}`

autoUpdater.setFeedURL({
    url: feed
})

setInterval(() => {
    autoUpdater.checkForUpdates()
}, 10 * 60 * 1000)

autoUpdater.on('update-downloaded', (_event, _releaseNotes, releaseName) => {
    const dialogOpts = {
      type: "info" as const,
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: `v${releaseName}`,
      detail:
        `Une nouvelle version a été téléchargée. Redémarrez l'application pour appliquer les mises à jour.`
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})

new MvpApp()