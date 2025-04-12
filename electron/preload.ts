import { contextBridge, ipcRenderer } from "electron"
import { Schema } from "./store/store"
import { ProgressInfo, UpdateInfo } from "electron-updater"


contextBridge.exposeInMainWorld('mvpApi', {
    // MVPS
    /**
     * Retrieves all MVPs.
     * @returns {Promise<Mvp[]>} A promise that resolves to an array of MVP objects.
     * @example
     * const mvps = await window.mvpApi.getMvps()
     * console.log(mvps) // [{id: 1, name: 'MVP 1'}, {id: 2, name: 'MVP 2'}]
     */
    getMvps: (): Promise<Mvp[]> => ipcRenderer.invoke('getMvps') as Promise<Mvp[]>,

    /**
     * Updates a specific MVP.
     * @param {Mvp} mvp - The MVP object to update.
     * @example
     * const mvpToUpdate = {id: 1, name: 'Updated MVP'}
     * window.mvpApi.updateMvp(mvpToUpdate)
     */
    updateMvp: (mvp: Mvp) => ipcRenderer.send('updateMvp', mvp),

    /**
     * Sets the entire list of MVPs.
     * @param {Mvp[]} mvps - An array of MVP objects to set.
     * @example
     * const newMvps = [{id: 1, name: 'New MVP 1'}, {id: 2, name: 'New MVP 2'}]
     * window.mvpApi.setMvps(newMvps)
     */
    setMvps: (mvps: Mvp[]) => ipcRenderer.send('setMvps', mvps),

    // SETTINGS
    /**
     * Retrieves the current settings.
     * @returns {Promise<Settings>} A promise that resolves to the Settings object.
     * @example
     * const settings = await window.mvpApi.getSettings()
     * console.log(settings) // {theme: 'dark', notifications: true}
     */
    getSettings: (): Promise<Settings> => ipcRenderer.invoke('getSettings') as Promise<Settings>,

    /**
     * Retrieves all notifications.
     * @returns {Promise<MvpNotification[]>} A promise that resolves to an array of MVP notifications.
     * @example
     * const notifications = await window.mvpApi.getNotifications()
     * console.log(notifications) // [{mvpName: 'Baphomet', mapName: 'Inferno', respawn: '2024-01-01 12:00:00', ...}, ...]
     */
    getNotifications: (): Promise<MvpNotification[]> => ipcRenderer.invoke('getNotifications') as Promise<MvpNotification[]>,

    /**
     * Updates a specific setting.
     * @param {keyof Schema} key - The key of the setting to update.
     * @param {Schema[keyof Schema]} value - The new value for the setting.
     * @example
     * window.mvpApi.setSettings('theme', 'light')
     * window.mvpApi.setSettings('notifications', false)
     */
    setSettings: <K extends keyof Schema>(key: K, value: Schema[K]) => ipcRenderer.send('setSettings', { key: key, value: value }),

    // NOTIFICATIONS
    /**
     * Adds a notification.
     */
    addNotification: (notification: MvpNotification) => ipcRenderer.send('addNotification', notification),

    /**
     * Clears all notifications.
     */
    clearNotifications: () => ipcRenderer.send('clearNotifications'),

    /**
     * Removes a notification.
     */
    removeNotification: (notification: MvpNotification) => ipcRenderer.send('removeNotification', notification),

    /**
     * Indicates that the application has loaded.
     */
    appLoaded: () => ipcRenderer.send('appLoaded'),

    /**
     * Opens a link in the default browser.
     */
    openLink: (link: string) => ipcRenderer.send('openLink', link)
})


contextBridge.exposeInMainWorld('splashScreenApi', {
    progress: () => ipcRenderer.invoke('progress')
})


contextBridge.exposeInMainWorld('autoUpdaterApi', {
    checkForUpdates: () => ipcRenderer.send('checkForUpdates'),
    downloadUpdate: () => ipcRenderer.send('downloadUpdate'),
    quitAndInstall: () => ipcRenderer.send('quitAndInstall'),

    updateAvailable: (callback: (info: UpdateInfo) => void) => ipcRenderer.on('updateAvailable', (_event, value) => callback(value)),
    updateDownloaded: (callback: () => void) => ipcRenderer.on('updateDownloaded', (_event) => callback()),
    downloadProgress: (callback: (progress: ProgressInfo) => void) => ipcRenderer.on('downloadProgress', (_event, value) => callback(value))
})