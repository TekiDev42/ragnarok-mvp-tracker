export const getStoragePerPage = (): string => {
    return localStorage.getItem('perPage') ?? '12'
}