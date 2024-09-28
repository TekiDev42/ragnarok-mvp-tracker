/**
 * Retrieves the respawn timer value from localStorage.
 * 
 * @returns {number} The respawn timer value as a number.
 * 
 * @description
 * This function retrieves the 'respawnTimer' value from localStorage.
 * If the value doesn't exist or can't be parsed as a number, it returns 0.
 * 
 * @example
 * // Assuming localStorage has 'respawnTimer' set to "300"
 * const timer = getStorageTimer();
 * console.log(timer); // Output: 300
 * 
 * @example
 * // Assuming localStorage doesn't have 'respawnTimer' set
 * const timer = getStorageTimer();
 * console.log(timer); // Output: 0
 */
export const getStorageTimer = (): number => {
    return parseInt(localStorage.getItem('respawnTimer') ?? "0")
}