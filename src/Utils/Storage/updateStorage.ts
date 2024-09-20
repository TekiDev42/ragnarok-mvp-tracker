export const updateStorage = (key: string, value: any):void => {
    if(typeof value === 'string') {
        localStorage.setItem(key, value)
        return
    }

    localStorage.setItem(key, JSON.stringify(value))
}