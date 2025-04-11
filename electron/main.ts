import { dialog } from "electron";
import {MvpApp} from "./classes/MvpApp.ts";
import { autoUpdater } from 'electron-updater';


autoUpdater.autoDownload = false

autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
})

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want update now?',
        buttons: ['Sure', 'No']
    }).then((buttonIndex) => {
        if (buttonIndex.response === 0) {
            autoUpdater.downloadUpdate()
        }
    })
})

autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
        title: 'No Updates',
        message: 'Current version is up-to-date.'
    })
})

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        title: 'Install Updates',
        message: 'Updates downloaded, application will be quit for update...'
    }).then(() => {
        setImmediate(() => autoUpdater.quitAndInstall())
    })
})

new MvpApp()