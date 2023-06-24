/**
 * Main File - Running the server.
 */

// Dependencies
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const express = require('express');

/**
 * Creating a server using the http module
 */
const server = http.createServer(function requestHandler(req, res) {
    // Extracting data from request url, 
    // eg: pathname - /home or /hello
    const URL = url.parse(req.url, true);

    // Based on path, return the respective file
    if (URL.pathname === '/') {
        fs.readFile('index.html', function (err, data) {
            res.write(data);
            res.end()
        })
    } else if (URL.pathname === '/hello') {
        fs.readFile('hello.html', function (err, data) {
            res.write(data);
            res.end()
        })
    }
})

// Starting the server on port 5000
server.listen(5000, function () {
    console.log('Http Server running on port 5000')
})

/**
 * Creating a server using express package
 */
const app = express();

app.get('/', function (req, res) {
    // Path library is used to normalize to absolute path of the system
    // Global varialbe - __dirname name give the location of the current directory (project)
    // with respect to your current system
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/hello', function (req, res) {
    res.sendFile(path.join(__dirname, 'hello.html'))
})

// Starting express server on port 5001
app.listen(5001, () => {
    console.log('Express Server running on 5001')
})