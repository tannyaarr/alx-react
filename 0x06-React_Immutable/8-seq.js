// Import seq from Immutable.js
import { Seq } from 'immutable';

/**
 * Filters and prints the best students with a score greater than or equal to 70.
 *
 * @param {Object} grades - Object containing student grades.
 */
export function printBestStudents(grades) {
    // Convert the grades object to a Seq for efficient filtering
    const gradesSeq = Seq(grades);

    // Filter the students with a score >= 70 and print their names
    gradesSeq.filter(student => student.score >= 70)
             .forEach(student => {
                 const { firstName, lastName, score } = student;
                 console.log(`Score: ${score}, First Name: ${capitalize(firstName)}, Last Name: ${capitalize(lastName)}`);
             });
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
