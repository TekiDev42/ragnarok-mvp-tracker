/**
 * Filters an array of MVP objects based on a search value.
 * 
 * @param {Mvp[]} mvps - An array of MVP objects to filter.
 * @param {string} value - The search value to filter by.
 * @returns {Mvp[]} An array of MVP objects that match the search criteria.
 * 
 * @description
 * This function filters MVPs based on their Name, AegisName, or Id.
 * The search is case-insensitive for Name and AegisName.
 * If the search value can be parsed as an integer, it will also match against the MVP's Id.
 * 
 * @example
 * const allMvps = [
 *   { Id: 1, Name: "Eddga", AegisName: "EDDGA" },
 *   { Id: 2, Name: "Osiris", AegisName: "OSIRIS" }
 * ];
 * const filtered = filterMvpsByNameOrId(allMvps, "edd");
 * // Result: [{ Id: 1, Name: "Eddga", AegisName: "EDDGA" }]
 */
export const filterMvpsByNameOrId = (mvps: Mvp[], value: string): Mvp[] => {
    const lowerValue = value.toLowerCase();
    const numValue = parseInt(value);
    
    return mvps.filter(mvp => 
        mvp.Name.toLowerCase().includes(lowerValue) ||
        mvp.AegisName.toLowerCase().includes(lowerValue) ||
        mvp.Id === numValue
    )
}