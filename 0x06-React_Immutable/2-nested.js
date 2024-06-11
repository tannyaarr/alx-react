export default function accessImmutableObject(object, array) {
    return array.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : undefined, object);
}
