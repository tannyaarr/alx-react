// Import Map from Immutable.js
import { Map } from 'immutable';

/**
 * Deeply merges two objects into an Immutable List containing their values.
 *
 * @param {Object} page1 - The first object.
 * @param {Object} page2 - The second object.
 * @returns {Immutable.List} - The list containing the merged values.
 */
export function mergeDeeplyElements(page1, page2) {
    // Convert objects to Immutable Maps
    const map1 = Map(page1);
    const map2 = Map(page2);

    // Merge the maps deeply
    const mergedMap = map1.mergeDeepWith((oldVal, newVal) => {
        // If oldVal and newVal are both maps, merge them recursively
        if (Map.isMap(oldVal) && Map.isMap(newVal)) {
            return oldVal.mergeDeep(newVal);
        }
        // If oldVal and newVal are both lists, concatenate them
        if (List.isList(oldVal) && List.isList(newVal)) {
            return oldVal.concat(newVal);
        }
        // Otherwise, return newVal (to overwrite oldVal)
        return newVal;
    }, map2);

    // Convert the merged map to a List and return
    return mergedMap.toList();
}
