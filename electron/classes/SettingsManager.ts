import Store from "electron-store";
import {Schema, store} from "../store/store.ts";

export class SettingsManager {
    private readonly settings: Store<Schema> = store

    constructor () {}

    getSettings (){
        return this.settings.store
    }

    setSettings ({key, value}: {key: string, value: string|number|boolean}) {
        this.settings.set(key, value)
    }
}