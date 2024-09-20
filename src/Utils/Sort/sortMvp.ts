import {getMvpDiff} from "@utils/getMvpDiff.ts";

/**
 * Sort by bookmarks & shortest time
 *
 * Bookmarks first, and shortest time first
 * Then all the others by short time
 * If diff time is negative, sort by name ASC
 */
export const sortMvp = (MvpA: Mvp, MvpB: Mvp): number => {
    const MvpADiff = getMvpDiff(MvpA).toMillis()
    const MvpBDiff = getMvpDiff(MvpB).toMillis()

    if(MvpA.isBookmark && !MvpB.isBookmark) return -1
    if(!MvpA.isBookmark && MvpB.isBookmark) return 1

    if(MvpA.isBookmark && MvpB.isBookmark) return MvpADiff < MvpBDiff ? -1 : 1

    if(MvpADiff <= 0 && MvpBDiff <= 0) return MvpA.Name.localeCompare(MvpB.Name)

    if(MvpADiff <= 0 && MvpBDiff > 0) return 1
    if(MvpBDiff <= 0 && MvpADiff > 0) return -1

    return MvpADiff < MvpBDiff ? -1 : 1
}