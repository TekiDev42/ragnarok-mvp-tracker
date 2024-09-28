/**
 * Converts bytes to megabytes (MB) and returns a formatted string.
 * 
 * @param {number} bytes - The number of bytes to convert.
 * @param {number} [decimals=2] - The number of decimal places to round to (default is 2).
 * @returns {string} A string representing the converted value in MB, with the specified number of decimal places.
 * 
 * @example
 * const result = bytesToMB(1048576); // Returns "1.00 MB"
 * const result2 = bytesToMB(2097152, 3); // Returns "2.000 MB"
 */
export const bytesToMB = (bytes: number, decimals = 2): string => {
    const MB = bytes / (1024 * 1024);
    return `${MB.toFixed(decimals)} MB`;
}