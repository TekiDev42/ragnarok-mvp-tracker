import fs from "node:fs";

export class FileManager {
    filepath: string

    constructor(filepath: string) {
        this.filepath = filepath
    }

    createDirApp (path: string): void {
        fs.mkdir(path, {recursive: true}, () => {})
    }

    writeFile <T>(data: T, path: string): void {
        fs.writeFile(path, JSON.stringify(data), () => {})
    }

    async readFile <T>(path: string): Promise<T> {
        return await new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if(err){
                    reject(err)
                    return
                }
                resolve(JSON.parse(data.toString()))
            })
        })
    }
}