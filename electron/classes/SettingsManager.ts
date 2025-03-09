import Store from "electron-store"
import { Schema, store } from "../store/store.ts"
import { version as appVersion } from "../../package.json"

/**
 * SettingsManager class
 * 
 * Manages application settings using electron-store.
 * 
 * @example
 * const settingsManager = new SettingsManager()
 * const allSettings = settingsManager.getAllSettings()
 * settingsManager.updateSetting('theme', 'dark')
 */
export class SettingsManager {
    private readonly settings: Store<Schema>

    /**
     * Creates an instance of SettingsManager.
     */
    constructor() {
        if ((store.get('version') as unknown as string) !== appVersion) {
            store.clear()
            store.set('version', appVersion)
        }

        this.settings = store
    }

    /**
     * Retrieves all settings.
     * 
     * @returns {Schema} All current settings
     * 
     * @example
     * const allSettings = settingsManager.getAllSettings()
     * console.log(allSettings)
     */
    getAllSettings(): Schema {
        return this.settings.store
    }

    /**
     * Retrieves a specific setting.
     * 
     * @param {keyof Schema} key - The key of the setting to retrieve
     * @returns {Schema[keyof Schema]} The value of the specified setting
     * 
     * @example
     * const theme = settingsManager.getSetting('theme')
     * console.log(theme)
     */
    getSetting<K extends keyof Schema>(key: K): Schema[K] {
        return this.settings.get(key) as Schema[K]
    }

    /**
     * Updates a specific setting.
     * 
     * @param {keyof Schema} key - The key of the setting to update
     * @param {Schema[keyof Schema]} value - The new value for the setting
     * 
     * @example
     * settingsManager.updateSetting('theme', 'dark')
     */
    updateSetting<K extends keyof Schema>(key: K, value: Schema[K]): void {
        this.settings.set(key, value)
    }

    /**
     * Retrieves all notifications.
     * 
     * @returns {MvpNotification[]} All current notifications
     * 
     * @example
     * const notifications = settingsManager.getNotifications()
     * console.log(notifications)
     */
    getNotifications(): MvpNotification[] {
        return this.settings.get('notifications') as unknown as MvpNotification[]
    }

    /**
     * Clears all notifications.
     * 
     * @example
     * settingsManager.clearNotifications()
     */
    clearNotifications(): void {
        this.settings.set('notifications', [])
    }

    /**
     * Removes a notification.
     * 
     * @param {MvpNotification} notification - The notification to remove
     * 
     * @example
     * settingsManager.removeNotification(notification)
     */
    removeNotification(notification: MvpNotification): void {
        const notifications = this.settings.get('notifications') as unknown as MvpNotification[]
        this.settings.set('notifications', notifications.filter((n: MvpNotification) => n.id !== notification.id))
    }

    /**
     * Adds a notification.
     * 
     * @param {MvpNotification} notification - The notification to add
     * 
     * @example
     * settingsManager.addNotification(notification)
     */
    addNotification(notification: MvpNotification): void {
        const notifications = this.settings.get('notifications') as unknown as MvpNotification[]
        notifications.unshift(notification)
        if (notifications.length > 20) {
            notifications.pop()
        }
        this.settings.set('notifications', notifications)
    }
}