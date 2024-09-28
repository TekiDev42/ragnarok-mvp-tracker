/**
 * Updates a key-value pair in the localStorage.
 * 
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to be stored. Can be of any type.
 * @returns {void}
 * 
 * @description
 * This function stores a value in localStorage under the specified key.
 * If the value is a string, it's stored as-is. For all other types,
 * the value is converted to a JSON string before storage.
 * 
 * @example
 * // Storing a string
 * updateStorage('username', 'JohnDoe');
 * 
 * @example
 * // Storing an object
 * const user = { id: 1, name: 'John Doe', age: 30 };
 * updateStorage('userInfo', user);
 * 
 * @example
 * // Storing an array
 * const fruits = ['apple', 'banana', 'orange'];
 * updateStorage('favoritesFruits', fruits);
 */
export const updateStorage = (key: string, value: any): void => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}