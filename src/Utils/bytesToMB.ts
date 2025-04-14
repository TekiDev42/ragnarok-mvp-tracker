/**
 * Converts bytes to megabytes (MB) and returns a formatted string.
 */
export const bytesToMB = (bytes: number, decimals = 2): string => {
    if (bytes < 1024) {
        return `${bytes} B`
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(decimals)} KB`
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(decimals)} MB`
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(decimals)} GB`
}