/**
 * Finds the index of a target MVP in an array of MVPs.
 * 
 * @param {Mvp[]} mvps - An array of MVP objects to search through.
 * @param {Mvp} target - The target MVP object to find in the array.
 * @returns {number} The index of the target MVP in the array, or -1 if not found.
 * 
 * This function uses the `findIndex` method to locate the position of the target MVP
 * in the given array. It compares the `Id` property of each MVP in the array
 * with the `Id` of the target MVP.
 * 
 * @example
 * const mvpList = [
 *   { Id: 1, name: 'Eddga' },
 *   { Id: 2, name: 'Osiris' },
 *   { Id: 3, name: 'Baphomet' }
 * ];
 * const targetMvp = { Id: 2, name: 'Osiris' };
 * const index = getMvpIndex(mvpList, targetMvp);
 * console.log(index); // Outputs: 1
 */
export const getMvpIndex = (mvps: Mvp[], target: Mvp): number => {
    return mvps.findIndex(mvp => mvp.Id === target.Id)
}