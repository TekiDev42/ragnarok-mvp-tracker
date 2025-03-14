import bg from "../../public/images/dark-background.webp"
import Store from "electron-store"

export type Schema = {
    version: {
        type: string,
        default: string,
    },
    animation: {
        type: string,
        default: boolean,
    },
    background: {
        type: string,
        default: string,
    },
    soundNotification: {
        type: string,
        default: boolean,
    },
    delayNotification: {
        type: string,
        default: number,
    },
    respawnTimer: {
        type: string,
        default: number,
    }
    perPage: {
        type: string,
        default: number,
    },
    cardRates: {
        type: string,
        default: number,
    },
    rates: {
        type: string,
        default: number,
    },
    notificationVolume: {
        type: string,
        default: number,
    },
    notifications: {
        type: string,
        default: [],
    },
    primaryDisplay: {
        type: string,
        default: number,
    },
    windowPosition: {
        type: string,
        default: {
            x: number,
            y: number,
        },
    },
    windowSize: {
        type: string,
        default: {
            width: number,
            height: number,
        },
    },
}

/**
 * Configuration schema for the application.
 */
export const schema: Schema = {
    version: {
        type: 'string',
        default: '1.0.0',
    },
    animation: {
        type: 'boolean',
        default: true,
    },
    background: {
        type: 'string',
        default: bg,
    },
    soundNotification: {
        type: 'boolean',
        default: true,
    },
    delayNotification: {
        type: 'number',
        default: 1000,
    },
    respawnTimer: {
        type: 'number',
        default: 0,
    },
    perPage: {
        type: "number",
        default: 12,
    },
    cardRates: {
        type: "number",
        default: 1,
    },
    rates: {
        type: "number",
        default: 1,
    },
    notificationVolume: {
        type: "number",
        default: 20,
    },
    notifications: {
        type: "array",
        default: [],
    },
    primaryDisplay: {
        type: "number",
        default: 0,
    },
    windowPosition: {
        type: "object",
        default: {
            x: 0,
            y: 0,
        },
    },
    windowSize: {
        type: "object",
        default: {
            width: 1280,
            height: 800,
        },
    },
}

export const store = new Store<Schema>({ schema })