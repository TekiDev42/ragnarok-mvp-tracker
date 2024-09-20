import {getRespawn} from "@utils/getRespawn.ts";
import {DateTime} from "luxon";
import {defaultRespawnTimer} from "@constants/defaults.ts";

/**
 * Sort Map by shortest timer
 */
export const sortMvpMap = (mapA: MvpMap, mapB: MvpMap): number => {
    const respawnA = getRespawn(mapA.deathTime, defaultRespawnTimer === 0 ? mapA.respawnTimer : defaultRespawnTimer)
    const respawnB = getRespawn(mapB.deathTime, defaultRespawnTimer === 0 ? mapB.respawnTimer : defaultRespawnTimer)

    const mapADiff =  respawnA.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])
    const mapBDiff =  respawnB.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])

    if(mapADiff.toMillis() <= 0 && mapBDiff.toMillis() > 0) return 1
    if(mapBDiff.toMillis() <= 0 && mapADiff.toMillis() > 0) return -1

    return mapADiff.toMillis() < mapBDiff.toMillis() ? -1 : 0
}