import {getRespawn} from "@utils/getRespawn.ts";
import {DateTime} from "luxon";
import {defaultRespawnTimer} from "@constants/defaults.ts";

/**
 * Sorts MvpMap objects based on their respawn timers.
 * 
 * @param {MvpMap} mapA - The first MvpMap object to compare.
 * @param {MvpMap} mapB - The second MvpMap object to compare.
 * @returns {number} A number indicating the sort order:
 *                   - Negative if mapA should be sorted before mapB
 *                   - Positive if mapA should be sorted after mapB
 *                   - Zero if the order doesn't matter
 * 
 * @description
 * This function compares two MvpMap objects based on their respawn times.
 * It prioritizes maps with positive time differences (not yet respawned) over those with non-positive time differences (already respawned).
 * Among maps with positive time differences, it sorts by the shortest remaining time until respawn.
 * 
 * @example
 * const mapA = { deathTime: "2023-06-01T10:00:00", respawnTimer: 60 };
 * const mapB = { deathTime: "2023-06-01T09:30:00", respawnTimer: 120 };
 * const result = sortMvpMap(mapA, mapB);
 * // If current time is 2023-06-01T10:30:00, result would be 1 (mapA comes after mapB)
 * 
 * @example
 * const mapC = { deathTime: "2023-06-01T10:00:00", respawnTimer: 60 };
 * const mapD = { deathTime: "2023-06-01T09:00:00", respawnTimer: 60 };
 * const result = sortMvpMap(mapC, mapD);
 * // If current time is 2023-06-01T10:30:00, result would be -1 (mapC comes before mapD)
 */
export const sortMvpMap = (mapA: MvpMap, mapB: MvpMap): number => {
    const respawnA = getRespawn(mapA.deathTime, defaultRespawnTimer === 0 ? mapA.respawnTimer : defaultRespawnTimer)
    const respawnB = getRespawn(mapB.deathTime, defaultRespawnTimer === 0 ? mapB.respawnTimer : defaultRespawnTimer)

    const mapADiff =  respawnA.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])
    const mapBDiff =  respawnB.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])

    if (mapA.name === "moc_prydn2") {
        console.log(mapA.deathTime, mapB.deathTime)
    }

    if (mapB.name === "moc_prydn2") {
        console.log(mapA.deathTime, mapB.deathTime)
    }

    if(mapADiff.toMillis() <= 0 && mapBDiff.toMillis() > 0) return 1
    if(mapBDiff.toMillis() <= 0 && mapADiff.toMillis() > 0) return -1

    return mapADiff.toMillis() < mapBDiff.toMillis() ? -1 : 0
}