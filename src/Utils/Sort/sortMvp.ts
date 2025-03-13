import {getMvpDiff} from "@utils/getMvpDiff.ts"


export const sortMvp = (MvpA: Mvp, MvpB: Mvp): number => {
    // Get time differences for both MVPs
    const MvpADiff = MvpA.mvpMaps[0]?.deathTime > 0 ? getMvpDiff(MvpA.mvpMaps[0]?.deathTime) : 0
    const MvpBDiff = MvpB.mvpMaps[0]?.deathTime > 0 ? getMvpDiff(MvpB.mvpMaps[0]?.deathTime) : 0

    // Compare bookmark status first
    const bookmarkDiff = Number(MvpB.isBookmark) - Number(MvpA.isBookmark)
    if (bookmarkDiff !== 0) {
        // If one is bookmarked, prioritize it regardless of timer
        return bookmarkDiff
    }

    // If both have non-positive time differences, sort alphabetically
    if (MvpADiff === 0 && MvpBDiff === 0) {
        return MvpA.Name.localeCompare(MvpB.Name)
    }

    // Prioritize MVPs with non-positive time differences
    if (MvpADiff <= 0) return 1
    if (MvpBDiff <= 0) return -1

    // Sort based on time difference for positive timers
    return MvpADiff - MvpBDiff
}
