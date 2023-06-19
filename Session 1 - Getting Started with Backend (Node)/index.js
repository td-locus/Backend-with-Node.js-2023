console.log("hello, world!")

const a = 10;
const b = 20;

console.log(a + b);

try {
    const element = document.querySelector('#box');
} catch (error) {
    console.log('Not in browser!')
}