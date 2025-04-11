import { autoUpdater, AppUpdater, UpdateInfo } from "electron-updater";
import { dialog } from "electron";


export class appAutoUpdater {
    private autoUpdater: AppUpdater

    constructor() {
        this.autoUpdater = autoUpdater
        this.autoUpdater.autoDownload = false
        this.setAutoUpdaterEvents()
    }

    checkForUpdatesAndNotify() {
        this.autoUpdater.checkForUpdatesAndNotify()
    }

    setAutoUpdaterEvents() {
        this.autoUpdater.on('error', (error) => dialog.showErrorBox('Error: ', error === null ? "unknown" : (error.stack || error).toString()))
        this.autoUpdater.on('update-available', (info) => this.updateAvailable(info))
        this.autoUpdater.on('update-downloaded', () => this.updateDownloaded())
    }

    async updateAvailable(info: UpdateInfo) {
        const response = await dialog.showMessageBox({
            title: 'Update Available',
            message: `An update is available. Do you want to update now? New version: ${info.version}`,
            buttons: ['Yes', 'No']
        })

        if (response.response === 0) {
            this.autoUpdater.downloadUpdate()
        }
    }

    async updateDownloaded() {
        dialog.showMessageBox({
            title: 'Install Updates',
            message: 'Updates downloaded, application will be quit for update...'
        }).then(() => {
            setImmediate(() => this.autoUpdater.quitAndInstall())
        })
    }
}