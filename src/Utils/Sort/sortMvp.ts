import {getMvpDiff} from "@utils/getMvpDiff.ts";


export const sortMvp = (MvpA: Mvp, MvpB: Mvp): number => {
    // Compare bookmark status
    const bookmarkDiff = Number(MvpB.isBookmark) - Number(MvpA.isBookmark);
    if (bookmarkDiff !== 0) return bookmarkDiff;

    // Get time differences for both MVPs
    const MvpADiff = getMvpDiff(MvpA).toMillis();
    const MvpBDiff = getMvpDiff(MvpB).toMillis();

    // If both have non-positive time differences, sort alphabetically
    if (MvpADiff <= 0 && MvpBDiff <= 0) return MvpA.Name.localeCompare(MvpB.Name);

    // Prioritize MVPs with positive time differences
    if (MvpADiff <= 0) return 1;
    if (MvpBDiff <= 0) return -1;

    // Sort based on time difference
    return MvpADiff - MvpBDiff;
}