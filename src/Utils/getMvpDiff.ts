import { Duration } from "luxon";
import { getRespawn } from "@utils/getRespawn.ts";
import { getStorageTimer } from "@utils/Storage/getStorageTimer.ts";

/**
 * Calculates the time difference between now and the MVP's respawn time.
 * 
 * @param {Mvp} mvp - The MVP object containing respawn information.
 * @returns {Duration} A Duration object representing the time difference.
 * 
 * This function performs the following steps:
 * 1. Determines the respawn timer, prioritizing:
 *    a) The value from storage
 *    b) The respawn timer of the first MVP map
 *    c) A default value of 0
 * 2. Gets the death time from the first MVP map, or uses a default if not available.
 * 3. Calculates the respawn time using the death time and respawn timer.
 * 4. Returns the difference between the respawn time and the current time.
 */
export const getMvpDiff = (mvp: Mvp): Duration => {
    const respawnTimer = getStorageTimer() || mvp.mvpMaps[0]?.respawnTimer || 0;
    const deathTime = mvp.mvpMaps[0]?.deathTime || "1970-01-01T01:00:00";
    const respawn = getRespawn(deathTime, respawnTimer);

    return respawn.diffNow(['hours', 'minutes', 'seconds']);
}