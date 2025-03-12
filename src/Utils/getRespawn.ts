import {DateTime} from "luxon"

/**
 * Calculates the respawn time of an MVP (Most Valuable Player) based on its death time and respawn interval.
 * 
 * @param {string} deathTime - The ISO 8601 formatted string representing the time when the MVP died.
 * @param {number} respawnTime - The number of minutes it takes for the MVP to respawn.
 * @returns {DateTime} A DateTime object representing the calculated respawn time.
 * 
 * This function takes the death time of an MVP and adds the respawn interval to it,
 * effectively calculating when the MVP will be available again. It uses the Luxon
 * library for date and time manipulation.
 * 
 * @example
 * const deathTime = "2023-06-01T12:00:00Z";
 * const respawnInterval = 120; // 2 hours
 * const respawnTime = getRespawn(deathTime, respawnInterval);
 * console.log(respawnTime.toISO()); // Outputs: 2023-06-01T14:00:00.000Z
 */
export const getRespawn = (deathTime: number, respawnTime: number): DateTime =>
    DateTime.fromMillis(deathTime).plus({minutes: respawnTime});