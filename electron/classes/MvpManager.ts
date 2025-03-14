import * as fs from "node:fs"
import { FileManager } from "./FileManager"
import { DOCUMENTS_PATH, MVPS_FILE } from "../constants/path.ts"
import { defaultMvps } from "../constants/mvps.ts"

/**
 * MvpManager class
 * 
 * Manages MVP (Most Valuable Player) data, including reading from and writing to files,
 * and updating MVP information.
 * 
 * @extends FileManager
 * 
 * @example
 * const mvpManager = new MvpManager()
 * const allMvps = mvpManager.getMvps()
 * console.log(allMvps) // Logs all MVPs
 */
export class MvpManager extends FileManager {
    private mvps: Mvp[] = defaultMvps
    public versionChanged: boolean = false

    /**
     * Creates an instance of MvpManager and initializes the data.
     * 
     * @example
     * const mvpManager = new MvpManager()
     */
    constructor(versionChanged: boolean = false) {
        super(MVPS_FILE)
        this.versionChanged = versionChanged
        this.initializeData()
    }

    /**
     * Initializes the MVP data by creating necessary directories and files if they don't exist,
     * or reading from existing files.
     * 
     * @private
     * 
     * @example
     * // This method is called automatically in the constructor
     * const mvpManager = new MvpManager()
     * // At this point, the data has been initialized
     */
    private initializeData(): void {
        if (!fs.existsSync(DOCUMENTS_PATH) || !fs.existsSync(this.filepath) || this.versionChanged) {
            this.createDirApp(DOCUMENTS_PATH)
            this.writeFile(this.mvps, this.filepath)
        } else {
            this.getMvpDataFromFile()
        }
    }

    /**
     * Retrieves all MVPs.
     * 
     * @returns {Mvp[]} An array of all MVPs
     * 
     * @example
     * const mvpManager = new MvpManager()
     * const allMvps = mvpManager.getMvps()
     * console.log(allMvps) // Logs all MVPs
     */
    getMvps(): Mvp[] {
        return this.mvps
    }

    /**
     * Reads MVP data from the file and updates the internal MVP array.
     * 
     * @returns {Promise<void>}
     * 
     * @example
     * const mvpManager = new MvpManager()
     * await mvpManager.getMvpDataFromFile()
     * console.log(mvpManager.getMvps()) // Logs updated MVPs from file
     */
    async getMvpDataFromFile(): Promise<void> {
        this.mvps = await this.readFile<Mvp[]>(this.filepath)
    }

    /**
     * Finds the index of a specific MVP in the internal MVP array.
     * 
     * @private
     * @param {Mvp} targetMvp - The MVP to find
     * @returns {number} The index of the MVP, or -1 if not found
     * 
     * @example
     * const mvpManager = new MvpManager()
     * const mvp = mvpManager.getMvps()[0]
     * const index = mvpManager['getMvpIndex'](mvp)
     * console.log(index) // Logs the index of the first MVP
     */
    private getMvpIndex(targetMvp: Mvp): number {
        return this.mvps.findIndex(element => element.Id === targetMvp.Id)
    }

    /**
     * Updates a specific MVP and writes the changes to the file.
     * 
     * @param {Mvp} mvp - The MVP to update
     * 
     * @example
     * const mvpManager = new MvpManager()
     * const mvp = mvpManager.getMvps()[0]
     * mvp.Name = "Updated MVP Name"
     * mvpManager.updateMvp(mvp)
     * console.log(mvpManager.getMvps()[0].Name) // Logs "Updated MVP Name"
     */
    updateMvp(mvp: Mvp): void {
        const index = this.getMvpIndex(mvp)
        if (index !== -1) {
            this.mvps[index] = mvp
            this.writeFile(this.mvps, this.filepath)
        }
    }

    /**
     * Sets a new array of MVPs and writes it to the file.
     * 
     * @param {Mvp[]} mvps - The new array of MVPs
     * 
     * @example
     * const mvpManager = new MvpManager()
     * const newMvps = [{ Id: 1, Name: "New MVP", ... }]
     * mvpManager.setMvps(newMvps)
     * console.log(mvpManager.getMvps()) // Logs the new MVPs array
     */
    setMvps(mvps: Mvp[]): void {
        this.mvps = mvps
        this.writeFile(mvps, this.filepath)
    }
}