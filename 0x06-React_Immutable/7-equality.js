import { Map, is } from 'immutable';

/**
 * Checks if two Immutable Maps are equal.
 *
 * @param {Immutable.Map} map1 - The first map.
 * @param {Immutable.Map} map2 - The second map.
 * @returns {boolean} - True if the maps are equal, false otherwise.
 */
export function areMapsEqual(map1, map2) {
    // Use is method from Immutable.js to check equality
    return is(map1, map2);
}
