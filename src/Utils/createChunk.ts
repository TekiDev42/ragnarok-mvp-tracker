/**
 * Creates chunks of an array with a specified size.
 * 
 * @template T The type of elements in the array.
 * @param {T[]} array The input array to be chunked.
 * @param {number} size The size of each chunk.
 * @returns {T[][]} An array of chunks, where each chunk is an array of size 'size' (or smaller for the last chunk).
 * 
 * @description
 * This function takes an array and divides it into smaller arrays (chunks) of a specified size.
 * If the original array's length is not evenly divisible by the chunk size, 
 * the last chunk will contain the remaining elements.
 * 
 * @example
 * const numbers = [1, 2, 3, 4, 5, 6, 7];
 * const chunked = createChunk(numbers, 3);
 * // Result: [[1, 2, 3], [4, 5, 6], [7]]
 */
export const createChunk = <T>(array: T[], size: number): T[][] => {
    const result: T[][] = [];

    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    
    return result;
}