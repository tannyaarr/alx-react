const { Map } = require('immutable');

/**
 * Converts a plain JavaScript object into an Immutable Map.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Immutable.Map} - The immutable Map.
 */
function getImmutableObject(obj) {
    return Map(obj);
}

module.exports = getImmutableObject;
