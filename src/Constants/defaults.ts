import {getStorageTimer} from "@utils/Storage/getStorageTimer.ts"
import bg from '@assets/dark-background.webp'

/**
 * Default respawn timer value retrieved from storage.
 * @example
 * console.log(defaultRespawnTimer) // Output: 3600 (or whatever value is stored)
 */
export const defaultRespawnTimer = getStorageTimer()

/**
 * Default size for images in pixels.
 * @example
 * const imageStyle = { width: `${sizeImage}px`, height: `${sizeImage}px` }
 */
export const sizeImage = 250

/**
 * Default background image.
 * @example
 * <div style={{ backgroundImage: `url(${defaultBackground})` }}></div>
 */
export const defaultBackground = bg

/**
 * Enum for connection status colors.
 * @example
 * const statusColor = isConnected ? ConnectionColors.green : ConnectionColors.red
 */
export enum ConnectionColors {
    green = "#40c057",
    red = "#f03e3e"
}

/**
 * Default URI configuration for the application.
 * @example
 * const apiUrl = `${URI.protocol}://${URI.ip}:${URI.port}/api`
 */
export const URI = {
    protocol: "http",
    ip: "localhost",
    port : "4242"
}

/**
 * Default settings for the application.
 * @example
 * const userSettings = { ...defaultSettings, theme: 'dark' }
 */
export const defaultSettings: Settings = {
    animation: true,
    background: bg,
    soundNotification: true,
    delayNotification: 0,
    respawnTimer: 0,
    perPage: 12
}