import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('splashScreenApi', {
    progress: () => ipcRenderer.invoke('progress')
})
