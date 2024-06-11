// 3-list.js

import { List } from 'immutable';

/**
 * Converts an array into an Immutable List.
 *
 * @param {Array} array - The array to convert.
 * @returns {Immutable.List} - The immutable List.
 */
export function getListObject(array) {
    return List(array);
}

/**
 * Appends an element to the Immutable List and returns the new list.
 *
 * @param {Immutable.List} list - The immutable List.
 * @param {string} element - The element to append.
 * @returns {Immutable.List} - The new immutable List with the element appended.
 */
export function addElementToList(list, element) {
    return list.push(element);
}