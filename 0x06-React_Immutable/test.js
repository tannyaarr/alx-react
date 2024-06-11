import accessImmutableObject from './0-fromjs';

const obj = {
    name: {
        first: "Guillaume",
        last: "Salva"
    }
};

console.log(accessImmutableObject(obj, ['name', 'first'])); // Should return "Guillaume"
console.log(accessImmutableObject(obj, ['name', 'middle'])); // Should return undefined
console.log(accessImmutableObject(obj, ['age'])); // Should return undefined