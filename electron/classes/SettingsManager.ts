import Store from "electron-store"
import { Schema, store } from "../store/store.ts"

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
        return this.settings.get(key)
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
}