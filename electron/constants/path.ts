import path from "node:path"
import {fileURLToPath} from "node:url"
import {app} from "electron"

/**
 * The directory name of the current module.
 * @example
 * console.log(__dirname) // '/path/to/your/project/electron/constants'
 */
export const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * The root directory of the application.
 * @example
 * console.log(process.env.APP_ROOT) // '/path/to/your/project'
 */
process.env.APP_ROOT = path.join(__dirname, '..')

/**
 * The root directory of the application.
 * @example
 * console.log(APP_ROOT) // '/path/to/your/project'
 */
export const APP_ROOT = process.env.APP_ROOT

/**
 * The URL of the Vite dev server.
 * @example
 * console.log(VITE_DEV_SERVER_URL) // 'http://localhost:3000'
 */
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL as string

/**
 * The path to the main process distribution files.
 * @example
 * console.log(MAIN_DIST) // '/path/to/your/project/dist-electron'
 */
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')

/**
 * The path to the renderer process distribution files.
 * @example
 * console.log(RENDERER_DIST) // '/path/to/your/project/dist'
 */
export const RENDERER_DIST = path.join(APP_ROOT, 'dist')

/**
 * The path to the application's documents folder.
 * @example
 * console.log(DOCUMENTS_PATH) // '/Users/username/Documents/mvp-timer'
 */
export const DOCUMENTS_PATH = path.join(app.getPath("documents"), 'mvp-timer')

/**
 * The path to the MVPs JSON file.
 * @example
 * console.log(MVPS_FILE) // '/Users/username/Documents/mvp-timer/mvps.json'
 */
export const MVPS_FILE = path.join(DOCUMENTS_PATH, "mvps.json")

/**
 * The path to the public directory, which changes based on whether the app is in development or production.
 * @example
 * console.log(VITE_PUBLIC) // '/path/to/your/project/public' (in development)
 * console.log(VITE_PUBLIC) // '/path/to/your/project/dist' (in production)
 */
export const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST

/**
 * The path to the application's icon.
 * @example
 * console.log(ICON_APP_PATH) // '/path/to/your/project/public/images/mvp-timer-icon.png'
 */
export const ICON_APP_PATH = path.join(VITE_PUBLIC, '/images/mvp-timer-icon.png')

/**
 * Set the VITE_PUBLIC environment variable.
 * @example
 * console.log(process.env.VITE_PUBLIC) // '/path/to/your/project/public'
 */
process.env.VITE_PUBLIC = VITE_PUBLIC