import path from "node:path";
import url from "node:url";

import {app, BrowserWindow, Menu, nativeImage,net,
        screen, Tray, Display, Size, App, protocol, ipcMain} from "electron";
import { MvpManager } from "./MvpManager";
import { SettingsManager } from "./SettingsManager";
import {ICON_APP_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL, __dirname} from "../constants/path.ts";


export class MvpApp {
    private app: App = app
    private window: BrowserWindow | null = null
    private tray: Tray | null = null
    private readonly mvpManager: MvpManager
    private readonly settingsManager: SettingsManager

    primaryDisplay: Display | null = null
    windowSize: Size | null = null

    constructor() {
        this.settingsManager = new SettingsManager()
        this.mvpManager = new MvpManager()
        this.onActivate()
        this.onWindowAllClosed()
        this.whenReady()
    }

    onActivate () {
        this.app.on('activate', () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow()
            }
        })

    }

    createTray () {
        const icon = nativeImage.createFromPath(ICON_APP_PATH)
        const contextMenu = Menu.buildFromTemplate([
            {label: 'Quit', role: 'quit'},
        ])

        this.tray = new Tray(icon)
        this.tray.setToolTip('Mvp Timer app')
        this.tray.setTitle('Mvp Timer app')
        this.tray.setContextMenu(contextMenu)
    }

    createWindow () {
        this.window = new BrowserWindow({
            width: this.windowSize?.width ?? 1280,
            height: this.windowSize?.height ?? 800,
            fullscreen: false,
            autoHideMenuBar: true,
            icon: ICON_APP_PATH,
            webPreferences: {
                preload: path.join(__dirname, 'preload.mjs'),
            },
            title: "Mvp Timer",

        })

        if (VITE_DEV_SERVER_URL) {
            this.window.loadURL(VITE_DEV_SERVER_URL)
        } else {
            this.window.loadFile(path.join(RENDERER_DIST, 'index.html'))
        }

        if (VITE_DEV_SERVER_URL) {
            this.window.webContents.openDevTools({
                mode: 'detach'
            })
        }

        this.window.maximize()
        this.window.removeMenu()
    }

    setHandleEvent(){
        console.log('setHandleEvent')

        ipcMain.handle('getMvps', () => this.getMvps())
        ipcMain.handle('getSettings', () => this.getSettings())

        protocol.handle('atom', (request) => {
            const filePath = request.url.slice('atom://'.length)
            return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
        })
    }

    setOnEvent(){
        ipcMain.on('updateMvp', (_event, args: Mvp) => {
            this.mvpManager.updateMvp(args)
        })

        ipcMain.on('setMvps', (_event, args: Mvp[]) => {
            this.mvpManager.setMvps(args)
        })

        ipcMain.on('setSettings', (_event, args: {key: string, value: string|number|boolean }) => {
            this.settingsManager.setSettings(args)
        })
    }

    getMvps () {
        return this.mvpManager.getMvps()
    }

    getSettings (){
        return this.settingsManager.getSettings()
    }

    onWindowAllClosed () {
        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit()
                this.window = null
            }
        })
    }

    whenReady () {
        this.app.whenReady()
        .then(() => {
            this.primaryDisplay = screen.getPrimaryDisplay()
            this.windowSize = this.primaryDisplay.workAreaSize

            console.log('1')
            this.setHandleEvent()
            console.log('2')
            this.setOnEvent()
            console.log('3')

            this.createTray()
            this.createWindow()
        })
        .catch((e) => {

            console.log('Error : ', e)
        })
    }
}