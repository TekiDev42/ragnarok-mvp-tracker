import path from "node:path";
import url from "node:url";
import {
    app, BrowserWindow, Menu, nativeImage, net,
    screen, Tray, Display, Size, App, protocol, ipcMain,
    IpcMainEvent, Point
} from "electron";
import { MvpManager } from "./MvpManager";
import { SettingsManager } from "./SettingsManager";
import { ICON_APP_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL, __dirname } from "../constants/path.ts";
import { Schema } from "electron/store/store.ts";
import { shell } from "electron";

/**
 * MvpApp class
 * 
 * This class represents the main application for the MVP Timer.
 * It handles window creation, tray icon, event handling, and manages MVP and settings data.
 * 
 * @example
 * const mvpApp = new MvpApp();
 * // The app is now initialized and ready to run
 */
export class MvpApp {
    private app: App = app
    private window: BrowserWindow | null = null
    private splashScreen: BrowserWindow | null = null
    private tray: Tray | null = null
    private readonly mvpManager: MvpManager
    private readonly settingsManager: SettingsManager
    private progress: number = 0
    private appLoaded: boolean = false

    primaryDisplay: Display | null = null
    windowSize: Size | null = null
    windowPosition: Point | null = null

    /**
     * Creates an instance of MvpApp.
     * Initializes managers and sets up event listeners.
     */
    constructor() {
        this.settingsManager = new SettingsManager()
        this.mvpManager = new MvpManager(this.settingsManager.versionChanged)
        this.onActivate()
        this.onWindowAllClosed()
        this.whenReady()
    }

    /**
     * Sets up the 'activate' event listener.
     * Creates a new window if no windows are open when the app is activated.
     */
    onActivate() {
        this.app.on('activate', () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow()
            }
        })
    }

    /**
     * Creates the tray icon and its context menu.
     * 
     * @example
     * this.createTray();
     * // Tray icon is now visible with a 'Quit' option in its context menu
     */
    createTray() {
        const icon = nativeImage.createFromPath(ICON_APP_PATH)
        const contextMenu = Menu.buildFromTemplate([
            { label: 'Quit', role: 'quit' },
        ])

        this.tray = new Tray(icon)
        this.tray.setToolTip('Mvp Timer app')
        this.tray.setTitle('Mvp Timer app')
        this.tray.setContextMenu(contextMenu)
    }

    /**
     * Creates the main application window.
     * 
     * @example
     * this.createWindow();
     * // Main application window is now created and visible
     */
    createWindow() {

        this.splashScreen = new BrowserWindow({
            width: 600,
            height: 600,
            fullscreen: false,
            autoHideMenuBar: true,
            transparent: true,
            frame: false,
            alwaysOnTop: true,
            icon: ICON_APP_PATH,
            webPreferences: {
                preload: path.join(__dirname, 'preload.mjs'),
            },
        })

        this.splashScreen.center()
        this.splashScreen.focus()
        this.splashScreen.loadFile(path.join("splash-screen", 'splashScreen.html'))

        this.window = new BrowserWindow({
            width: this.windowSize?.width ?? 1280,
            height: this.windowSize?.height ?? 800,
            x: this.windowPosition?.x ?? 0,
            y: this.windowPosition?.y ?? 0,
            fullscreen: false,
            autoHideMenuBar: true,
            icon: ICON_APP_PATH,
            webPreferences: {
                preload: path.join(__dirname, 'preload.mjs'),
            },
            title: "Mvp Timer",
            show: false,
        })


        if (VITE_DEV_SERVER_URL) {
            this.window.loadURL(VITE_DEV_SERVER_URL)
        } else {
            this.window.loadFile(path.join(RENDERER_DIST, 'index.html'))
        }

        if (VITE_DEV_SERVER_URL) {

            this.splashScreen?.webContents.openDevTools({
                mode: 'detach'
            })


            this.window?.webContents.openDevTools({
                mode: 'detach'
            })

        }

        // this.window.maximize()
        this.window.removeMenu()
    }

    /**
     * Sets up event handlers for IPC communication and custom protocol.
     * 
     * @example
     * this.setHandleEvent();
     * // Event handlers are now set up for 'getMvps', 'getSettings', and 'atom' protocol
     */
    setHandleEvent() {
        ipcMain.handle('getMvps', () => this.getMvps())
        ipcMain.handle('getSettings', () => this.getSettings())

        protocol.handle('atom', (request) => {
            const filePath = request.url.slice('atom://'.length)
            return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
        })
    }

    setWindowEvent() {
        this.window?.on('resized', () => {
            const windowBounds = this.window?.getBounds()
            if (!windowBounds) return

            this.settingsManager.updateSetting('windowSize', {
                width: windowBounds.width,
                height: windowBounds.height
            })
        })

        this.window?.on('moved', () => {
            // Get the current window bounds
            const windowBounds = this.window?.getBounds()
            if (!windowBounds) return

            // Find which display the window is currently on
            const currentDisplay = screen.getDisplayNearestPoint({
                x: windowBounds.x,
                y: windowBounds.y
            })

            // Update the primary display and window size if the display has changed
            if (currentDisplay.id !== this.primaryDisplay?.id) {
                this.primaryDisplay = currentDisplay
                this.settingsManager.updateSetting('primaryDisplay', currentDisplay.id)
            }

            this.settingsManager.updateSetting('windowPosition', {
                x: windowBounds.x,
                y: windowBounds.y
            })
        })
    }

    /**
     * Sets up event listeners for IPC communication.
     * 
     * @example
     * this.setOnEvent();
     * // Event listeners are now set up for 'updateMvp', 'setMvps', and 'setSettings'
     */
    setOnEvent() {
        ipcMain.on('appLoaded', () => {
            this.progress = 90
            this.appLoaded = true

            setTimeout(() => {
                this.progress = 100

                if (this.splashScreen) {
                    this.splashScreen.close()
                    this.splashScreen = null
                }

                if (this.window && !this.window.isVisible()) {
                    this.window.show()
                    this.window.focus()
                }
            }, 2_000)

        })

        ipcMain.handle('progress', () => {
            return new Promise((resolve) => {
                this.progress += Math.floor(Math.random() * (20 - 0 + 1) + 0)

                if (this.progress >= 80 && !this.appLoaded) {
                    this.progress = 80
                }

                resolve(this.progress)
            })
        })

        ipcMain.on('updateMvp', (_event, args: Mvp) => {
            this.mvpManager.updateMvp(args)
        })

        ipcMain.on('setMvps', (_event, args: Mvp[]) => {
            this.mvpManager.setMvps(args)
        })

        ipcMain.on('openLink', (_event, args: string) => {
            shell.openExternal(args)
        })

        ipcMain.on('setSettings', <K extends keyof Schema>(_event: IpcMainEvent, args: { key: K, value: Schema[K] }) => {
            this.settingsManager.updateSetting(args.key, args.value)
        })

        ipcMain.on('addNotification', (_event, args: MvpNotification) => {
            this.settingsManager.addNotification(args)
        })

        ipcMain.on('removeNotification', (_event, args: MvpNotification) => {
            this.settingsManager.removeNotification(args)
        })

        ipcMain.on('clearNotifications', () => {
            this.settingsManager.clearNotifications()
        })
    }

    /**
     * Retrieves the list of MVPs from the MvpManager.
     * 
     * @returns {Mvp[]} An array of MVP objects
     * 
     * @example
     * const mvps = this.getMvps();
     * console.log(mvps); // [{id: 1, name: 'Baphomet', ...}, ...]
     */
    getMvps(): Mvp[] {
        return this.mvpManager.getMvps()
    }

    /**
     * Retrieves the current settings from the SettingsManager.
     * 
     * @returns {Object} The current settings object
     * 
     * @example
     * const settings = this.getSettings();
     * console.log(settings); // {theme: 'dark', notifications: true, ...}
     */
    getSettings(): Schema {
        return this.settingsManager.getAllSettings()
    }

    /**
     * Sets up the 'window-all-closed' event listener.
     * Quits the app if all windows are closed (except on macOS).
     */
    onWindowAllClosed() {
        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit()
                this.window = null
            }
        })
    }

    /**
     * Initializes the app when it's ready.
     * Sets up the primary display, creates the window and tray, and sets up event handlers.
     * 
     * @example
     * this.whenReady();
     * // App is now fully initialized and running
     */
    whenReady() {
        this.app.whenReady()
            .then(() => {

                const primaryDisplay = this.settingsManager.getSetting('primaryDisplay') as unknown as number
                let userScreen = null

                if (primaryDisplay !== 0) {
                    userScreen = screen.getAllDisplays().find(display => display.id === primaryDisplay) ?? null
                }

                if (!userScreen) {
                    userScreen = screen.getPrimaryDisplay()
                }

                this.primaryDisplay = userScreen

                const windowSize = this.settingsManager.getSetting('windowSize') as unknown as Size
                const windowPosition = this.settingsManager.getSetting('windowPosition') as unknown as Point

                this.windowSize = windowSize
                this.windowPosition = windowPosition

                this.setHandleEvent()
                this.setOnEvent()
                this.createTray()
                this.createWindow()
                this.setWindowEvent()
            })
            .catch((e) => {
                console.log('Error : ', e)
            })
    }
}