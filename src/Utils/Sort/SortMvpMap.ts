import {DateTime} from "luxon";



export const sortMvpMap = (mapA: MvpMap, mapB: MvpMap): number => {
    const respawnA = DateTime.fromMillis(mapA.deathTime)
    const respawnB = DateTime.fromMillis(mapB.deathTime)

    const mapADiff =  respawnA.diffNow(['hours', 'minutes', 'seconds', 'milliseconds'])
    const mapBDiff =  respawnB.diffNow(['hours', 'minutes', 'seconds', 'milliseconds'])

    if(mapADiff.toMillis() <= 0 && mapBDiff.toMillis() > 0) return 1
    if(mapBDiff.toMillis() <= 0 && mapADiff.toMillis() > 0) return -1

    return mapADiff.toMillis() < mapBDiff.toMillis() ? -1 : 0
}