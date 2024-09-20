import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('mvpApi', {
    // MVPS
    getMvps: () => ipcRenderer.invoke('getMvps') as Promise<Mvp[]>,
    updateMvp: (mvp: Mvp) => ipcRenderer.send('updateMvp', mvp),
    setMvps: (mvps: Mvp[]) => ipcRenderer.send('setMvps', mvps),

    // SETTINGS
    getSettings: () => ipcRenderer.invoke('getSettings') as Promise<Settings>,
    setSettings: (key: string, value: string|number|boolean ) => ipcRenderer.send('setSettings', {key: key, value: value}),
})