import bg from "../../public/images/wallpaper.webp"
import Store from "electron-store"

/**
 * Schema for the application's configuration store.
 * @typedef {Object} Schema
 * @property {Object} animation - Controls animation settings.
 * @property {string} animation.type - The data type of the animation setting (should be 'boolean').
 * @property {boolean} animation.default - The default value for animation (true or false).
 * @property {Object} background - Controls background image settings.
 * @property {string} background.type - The data type of the background setting (should be 'string').
 * @property {string} background.default - The default background image path.
 * @property {Object} soundNotification - Controls sound notification settings.
 * @property {string} soundNotification.type - The data type of the sound notification setting (should be 'boolean').
 * @property {boolean} soundNotification.default - The default value for sound notifications (true or false).
 * @property {Object} delayNotification - Controls notification delay settings.
 * @property {string} delayNotification.type - The data type of the delay notification setting (should be 'number').
 * @property {number} delayNotification.default - The default delay in milliseconds.
 * @property {Object} respawnTimer - Controls respawn timer settings.
 * @property {string} respawnTimer.type - The data type of the respawn timer setting (should be 'number').
 * @property {number} respawnTimer.default - The default respawn time in milliseconds.
 * @property {Object} perPage - Controls items per page settings.
 * @property {string} perPage.type - The data type of the per page setting (should be 'number').
 * @property {number} perPage.default - The default number of items per page.
 */
export type Schema = {
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
    }
}

/**
 * Configuration schema for the application.
 * @type {Schema}
 * @example
 * // Accessing the schema
 * console.log(schema.animation.default) // true
 * console.log(schema.delayNotification.default) // 1000
 */
export const schema: Schema = {
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
    perPage:{
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
        default: 100,
    }
}

export const store = new Store<Schema>({schema})