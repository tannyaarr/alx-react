// 5-immutable.js

import { List, Map } from 'immutable';

/**
 * Concatenates two arrays into an Immutable List.
 *
 * @param {Array} page1 - The first array.
 * @param {Array} page2 - The second array.
 * @returns {Immutable.List} - The concatenated list.
 */
export function concatElements(page1, page2) {
    return List(page1).concat(List(page2));
}

/**
 * Merges two objects into an Immutable List containing their values.
 *
 * @param {Object} page1 - The first object.
 * @param {Object} page2 - The second object.
 * @returns {Immutable.List} - The list containing the merged values.
 */
export function mergeElements(page1, page2) {
    const map1 = Map(page1);
    const map2 = Map(page2);
    const mergedMap = map1.merge(map2);
    return mergedMap.toList();
}
