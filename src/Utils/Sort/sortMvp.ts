import {getMvpDiff} from "@utils/getMvpDiff.ts";

/**
 * Sorts MVP (Most Valuable Player) objects based on specific criteria.
 * 
 * @param {Mvp} MvpA - The first MVP object to compare.
 * @param {Mvp} MvpB - The second MVP object to compare.
 * @returns {number} A number indicating the sort order:
 *                   - Negative if MvpA should be sorted before MvpB
 *                   - Positive if MvpA should be sorted after MvpB
 *                   - Zero if the order doesn't matter
 * 
 * The sorting priority is as follows:
 * 1. Bookmarked MVPs are prioritized over non-bookmarked ones.
 * 2. MVPs with positive time differences are sorted based on their time difference.
 * 3. MVPs with non-positive time differences are sorted alphabetically by name.
 * 4. An MVP with a non-positive time difference is sorted after one with a positive time difference.
 */
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