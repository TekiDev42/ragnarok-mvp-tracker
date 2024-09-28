/**
 * Creates deep clones of an array of MVPs and a single MVP object.
 * 
 * @param {Mvp[]} list - The array of MVP objects to clone.
 * @param {Mvp} single - The single MVP object to clone.
 * @returns {[Mvp[], Mvp]} A tuple containing:
 *                         - A new array with clones of all MVPs from the input list.
 *                         - A new object that is a clone of the input single MVP.
 * 
 * This function is useful for creating copies of MVP data structures
 * to avoid unintended mutations of the original data.
 */
export const makeClones = (list: Mvp[], single: Mvp): [Mvp[], Mvp] => {
    return [[...list], {...single}];
}