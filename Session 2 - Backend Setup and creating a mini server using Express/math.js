/**
 * Custom Math Module
 */

function addTwoNum(a, b) {
    return a + b;
}

function subtractTwoNum(a, b) {
    return a - b;
}

// Wrap the functions created and export them together.
// That's essentially what module is - a set of functions.
module.exports = {
    addTwoNum, subtractTwoNum,
}