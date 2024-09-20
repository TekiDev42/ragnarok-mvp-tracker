import {DateTime, Duration} from "luxon";
import {getRespawn} from "@utils/getRespawn.ts";
import {getStorageTimer} from "@utils/Storage/getStorageTimer.ts";

export const getMvpDiff = (mvp: Mvp): Duration => {
    const timer = getStorageTimer()
    const respawnTimer = timer > 0 ? timer : mvp.mvpMaps[0]?.respawnTimer ?? 0
    const respawn = getRespawn(mvp.mvpMaps[0]?.deathTime ?? "1970-01-01T01:00:00", respawnTimer)

    return respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])
}