import path from "node:path";
import {fileURLToPath} from "node:url";
import {app} from "electron";

export const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

export const APP_ROOT = process.env.APP_ROOT
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL as string
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(APP_ROOT, 'dist')
export const DOCUMENTS_PATH = path.join(app.getPath("documents"), 'mvp-timer')
export const MVPS_FILE = path.join(DOCUMENTS_PATH, "mvps.json")
export const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST
export const ICON_APP_PATH = path.join(VITE_PUBLIC, '/images/mvp-timer-icon.png')

process.env.VITE_PUBLIC = VITE_PUBLIC