import {getStorageTimer} from "@utils/Storage/getStorageTimer.ts";
import bg from '@assets/wallpaper.webp'

export const defaultRespawnTimer = getStorageTimer()
export const sizeImage = 250
export const defaultBackground = bg

export enum ConnectionColors {
    green = "#40c057",
    red = "#f03e3e"
}

export const URI = {
    protocol: "http",
    ip: "localhost",
    port : "4242"
}

export const defaultSettings: Settings = {
    animation: true,
    background: bg,
    soundNotification: true,
    delayNotification: 0,
    respawnTimer: 0,
    perPage: 12
}