import fs from "node:fs";

/**
 * FileManager class for handling file operations.
 * 
 * @example
 * const fileManager = new FileManager('/path/to/file');
 * fileManager.createDirApp('/path/to/new/directory');
 * fileManager.writeFile({ key: 'value' }, '/path/to/file.json');
 * const data = await fileManager.readFile<{ key: string }>('/path/to/file.json');
 */
export class FileManager {
    filepath: string

    /**
     * Creates a new FileManager instance.
     * 
     * @param filepath - The base file path for operations
     * 
     * @example
     * const fileManager = new FileManager('/path/to/base/directory');
     */
    constructor(filepath: string) {
        this.filepath = filepath
    }

    /**
     * Creates a directory at the specified path.
     * 
     * @param path - The path where the directory should be created
     * 
     * @example
     * fileManager.createDirApp('/path/to/new/directory');
     */
    createDirApp (path: string): void {
        fs.mkdir(path, {recursive: true}, () => {})
    }

    /**
     * Writes data to a file at the specified path.
     * 
     * @param data - The data to write to the file
     * @param path - The path where the file should be written
     * 
     * @example
     * const data = { key: 'value' };
     * fileManager.writeFile(data, '/path/to/file.json');
     */
    writeFile <T>(data: T, path: string): void {
        fs.writeFile(path, JSON.stringify(data), () => {})
    }

    /**
     * Reads data from a file at the specified path.
     * 
     * @param path - The path of the file to read
     * @returns A promise that resolves with the parsed file content
     * 
     * @example
     * const data = await fileManager.readFile<{ key: string }>('/path/to/file.json');
     * console.log(data.key);
     */
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