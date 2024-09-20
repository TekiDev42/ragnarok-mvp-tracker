import * as fs from "node:fs";
import { FileManager } from "./FileManager";
import {DOCUMENTS_PATH, MVPS_FILE} from "../constants/path.ts";
import {defaultMvps} from "../constants/mvps.ts";


export class MvpManager extends FileManager {
    private mvps: Mvp[] = []

    constructor() {
        super(MVPS_FILE)

        this.mvps = defaultMvps

        if (!fs.existsSync(DOCUMENTS_PATH) || !fs.existsSync(this.filepath)) {
            this.createDirApp(DOCUMENTS_PATH)
            this.writeFile(defaultMvps, this.filepath)
        }

        this.getMvpDataFromFile(this.filepath)
    }

    getMvps(){
        return this.mvps
    }

    async getMvpDataFromFile(path: string) {
        this.mvps = await this.readFile<Mvp[]>(path)
    }

    getMvpIndex(targetMvp: Mvp){
        return this.mvps.findIndex(element => element.Id === targetMvp.Id)
    }

    updateMvp (mvp: Mvp) {
        this.mvps[this.getMvpIndex(mvp)] = mvp
        this.writeFile(this.mvps, this.filepath)
    }

    setMvps (mvps: Mvp[]) {
        this.mvps = mvps
        this.writeFile(mvps, this.filepath)
    }
}