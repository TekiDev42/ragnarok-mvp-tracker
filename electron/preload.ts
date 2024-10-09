import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('mvpApi', {
    // MVPS
    /**
     * Retrieves all MVPs.
     * @returns {Promise<Mvp[]>} A promise that resolves to an array of MVP objects.
     * @example
     * const mvps = await window.mvpApi.getMvps()
     * console.log(mvps) // [{id: 1, name: 'MVP 1'}, {id: 2, name: 'MVP 2'}]
     */
    getMvps: () => ipcRenderer.invoke('getMvps') as Promise<Mvp[]>,

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
    getSettings: () => ipcRenderer.invoke('getSettings') as Promise<Settings>,

    /**
     * Updates a specific setting.
     * @param {string} key - The key of the setting to update.
     * @param {string|number|boolean} value - The new value for the setting.
     * @example
     * window.mvpApi.setSettings('theme', 'light')
     * window.mvpApi.setSettings('notifications', false)
     */
    setSettings: (key: string, value: string|number|boolean ) => ipcRenderer.send('setSettings', {key: key, value: value})
})