import { autoUpdater, AppUpdater, UpdateInfo } from "electron-updater"
import { dialog } from "electron"

/**
 * Class responsible for handling automatic updates in the application.
 * Uses electron-updater to check for, download and install updates.
 */
export class appAutoUpdater {
    /** Instance of electron-updater's AppUpdater */
    private autoUpdater: AppUpdater

    /**
     * Initializes the auto updater with default settings and event handlers
     */
    constructor() {
        this.autoUpdater = autoUpdater
        this.autoUpdater.autoDownload = false
        this.setAutoUpdaterEvents()
    }

    /**
     * Checks if there are any updates available for the application
     */
    checkForUpdatesAndNotify() {
        this.autoUpdater.checkForUpdates()
    }

    /**
     * Sets up event handlers for the auto updater
     * Handles errors, update availability and download completion
     */
    setAutoUpdaterEvents() {
        this.autoUpdater.on('error', (error) => dialog.showErrorBox('Error: ', error === null ? "unknown" : (error.stack || error).toString()))
        this.autoUpdater.on('update-available', (info) => this.updateAvailable(info))
        this.autoUpdater.on('update-downloaded', () => this.updateDownloaded())
    }

    /**
     * Handles the case when an update is available
     * Shows a dialog to the user asking if they want to update
     * @param info - Information about the available update
     */
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

    /**
     * Handles the completion of update download
     * Shows a message to the user and initiates the update installation
     */
    async updateDownloaded() {
        dialog.showMessageBox({
            title: 'Install Updates',
            message: 'Updates downloaded, application will be quit for update...'
        }).then(() => {
            setImmediate(() => this.autoUpdater.quitAndInstall())
        })
    }
}