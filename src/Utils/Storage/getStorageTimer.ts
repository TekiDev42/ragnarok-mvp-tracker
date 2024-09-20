export const getStorageTimer = (): number => {
    return parseInt(localStorage.getItem('respawnTimer') ?? "0")
}