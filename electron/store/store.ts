import bg from "../../public/images/wallpaper.webp"
import Store from "electron-store";

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
    }
}

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
    }
}

export const store = new Store<Schema>({schema})