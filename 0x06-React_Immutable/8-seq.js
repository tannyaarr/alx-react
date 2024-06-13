import { Seq } from 'immutable';

const printBestStudents = (grades) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const bestStudents = Seq(grades)
        .filter(student => student.score >= 70)
        .map(student => ({
            ...student,
            firstName: capitalize(student.firstName),
            lastName: capitalize(student.lastName)
        }))
        .toObject();

    console.log(bestStudents);
};

export default printBestStudents;
