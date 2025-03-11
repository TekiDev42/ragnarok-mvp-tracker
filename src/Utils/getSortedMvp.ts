import { defaultMvps } from "@/Constants/defaultMvps.ts";

/**
 * Retrieves and sorts the list of MVPs.
 * 
 * @returns {Promise<Mvp[]>} A promise that resolves to an array of sorted MVP objects.
 * 
 * This function performs the following steps:
 * 1. Calls the `window.mvpApi.getMvps()` method to retrieve the list of MVPs.
 * 2. Passes the retrieved MVPs to the `sortMvps` function for sorting.
 * 3. Returns the sorted array of MVP objects.
 * 
 * The sorting criteria and logic are determined by the `sortMvps` function.
 * 
 * @example
 * const sortedMvps = await getSortedMvp();
 * console.log(sortedMvps); // Outputs: [Mvp, Mvp, ...]
 */
export const getSortedMvp = async (): Promise<Mvp[]> => {
    
    if (window.mvpApi) {
        return await window.mvpApi.getMvps()
    }

    return defaultMvps
}