/* 
* Using the File System Module to interact with files in the system
* Learn More: https://nodejs.org/api/fs.html
*/

// Dependencies
const fs = require('fs');

// Adding data to an already existing file.
fs.appendFile('./hello.txt', '\nI\'m doing great!', function (err) {
    if (err) console.logrs(err)
})

// Reading data from the file
fs.readFile('./hello.txt', function (err, data) {
    if (err) {
        console.log(err)
        return;
    }
    console.log(data.toString())
})