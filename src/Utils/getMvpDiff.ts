import { DateTime } from "luxon";


export const getMvpDiff = (deathTime: number): number => {
    const respawn = DateTime.fromMillis(deathTime)
    return respawn.diffNow(['hours', 'minutes', 'seconds', 'milliseconds']).toMillis();
}