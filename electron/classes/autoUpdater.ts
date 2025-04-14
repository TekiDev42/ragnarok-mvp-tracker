import { autoUpdater, AppUpdater, UpdateInfo, ProgressInfo } from "electron-updater"
import { dialog, ipcMain, BrowserWindow } from "electron"


/**
 * Class responsible for handling automatic updates in the application.
 * Uses electron-updater to check for, download and install updates.
 */
export class appAutoUpdater {
    /** Instance of electron-updater's AppUpdater */
    private autoUpdater: AppUpdater
    private mainWindow: BrowserWindow

    /**
     * Initializes the auto updater with default settings and event handlers
     */
    constructor(mainWindow: BrowserWindow) {
        this.autoUpdater = autoUpdater
        this.mainWindow = mainWindow
    }

    init(){
        this.autoUpdater.autoDownload = false
        this.setAutoUpdaterEvents()
    }


    /**
     * Sets up event handlers for the auto updater
     * Handles errors, update availability and download completion
     */
    setAutoUpdaterEvents() {
        this.autoUpdater.on('error', (error) => dialog.showErrorBox('Error: ', error === null ? "unknown" : (error.stack || error).toString()))
        this.autoUpdater.on('checking-for-update', () => console.log('Checking for update...'))
        this.autoUpdater.on('update-available', (info: UpdateInfo) => this.updateAvailable(info))
        this.autoUpdater.on('update-downloaded', () => this.updateDownloaded())
        this.autoUpdater.on('download-progress', (progress: ProgressInfo) => this.downloadProgress(progress))
        this.autoUpdater.on('update-not-available', () => console.log('Update not available'))

        ipcMain.on('checkForUpdates', () => this.autoUpdater.checkForUpdates())
        ipcMain.on('downloadUpdate', () => this.autoUpdater.downloadUpdate())
        ipcMain.on('quitAndInstall', () => setImmediate(() => this.autoUpdater.quitAndInstall()))
    }


    /**
     * Handles the download progress of the update
     * @param progress - The progress of the download
     */
    downloadProgress(progress: ProgressInfo) {
        this.mainWindow.webContents.emit('downloadProgress', progress)
    }


    /**
     * Handles the case when an update is available
     * @param info - Information about the available update
     */
    async updateAvailable(info: UpdateInfo) {
        this.mainWindow.webContents.emit('updateAvailable', info)
    }

    /**
     * Handles the case when an update is downloaded
     */
    async updateDownloaded() {
        this.mainWindow.webContents.emit('updateDownloaded')
    }
}