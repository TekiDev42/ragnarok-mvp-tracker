import * as fs from "node:fs";
import { FileManager } from "./FileManager";
import { DOCUMENTS_PATH, MVPS_FILE } from "../constants/path.ts";
import { defaultMvps } from "../constants/mvps.ts";

/**
 * MvpManager class
 * 
 * Manages MVP (Most Valuable Player) data, including reading from and writing to files,
 * and updating MVP information.
 * 
 * @extends FileManager
 */
export class MvpManager extends FileManager {
    private mvps: Mvp[] = defaultMvps;

    constructor() {
        super(MVPS_FILE);
        this.initializeData();
    }

    private initializeData(): void {
        if (!fs.existsSync(DOCUMENTS_PATH) || !fs.existsSync(this.filepath)) {
            this.createDirApp(DOCUMENTS_PATH);
            this.writeFile(this.mvps, this.filepath);
        } else {
            this.getMvpDataFromFile();
        }
    }

    getMvps(): Mvp[] {
        return this.mvps;
    }

    async getMvpDataFromFile(): Promise<void> {
        this.mvps = await this.readFile<Mvp[]>(this.filepath);
    }

    private getMvpIndex(targetMvp: Mvp): number {
        return this.mvps.findIndex(element => element.Id === targetMvp.Id);
    }

    updateMvp(mvp: Mvp): void {
        const index = this.getMvpIndex(mvp);
        if (index !== -1) {
            this.mvps[index] = mvp;
            this.writeFile(this.mvps, this.filepath);
        }
    }

    setMvps(mvps: Mvp[]): void {
        this.mvps = mvps;
        this.writeFile(mvps, this.filepath);
    }
}