import {DateTime} from "luxon";

export const getRespawn = (deathTime: string, respawnTime: number): DateTime => {
    const deathDT = DateTime.fromISO(deathTime)
    return deathDT.plus({minute: respawnTime})
}