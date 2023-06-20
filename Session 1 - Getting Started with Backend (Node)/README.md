# Session 1 - Getting Started with Backend (Node)

<p align="center">
    <img src="./session-1.svg" alt="Session 1" />
</p>

## Installing Node.js

Visit https://nodejs.org/en and download the compatible version for Windows. 

For Linux/Mac OS visit and follow the instructions mentioned at https://github.com/nodesource/distributions.

## Checking if Node.js is Installed

Run the following commands to check if you've successfully installed Node.js or not.

```bash
node -v
```

```bash
node --version
```

## Work with Node.js in Your Terminal directly

```bash
node
```

## Run a JavaScript file using  Node.

- Create a file called `index.js` and add any JS-related code. Eg: `console.log('Hello there!');`
- Open the terminal in the same directory as the `index.js` file.
- Run the following command to execute the `index.js` file.

```bash
node index.js
```

- The output in your terminal should be:

```bash
Hello there!
```

## WebAPIs are not accessible in Node.js Environment!

```javascript
console.log("hello, world!")

const a = 10;
const b = 20;

console.log(a + b);

try {
    const element = document.querySelector('#box');
} catch (error) {
    console.log('Not in browser!')
}
```

The output of the above code will be:

```bash
hello, world!
30
Not in browser!
```

This is because Node.js is a runtime environment OUTSIDE of your browser! Access to the web apps does not exist simply because they're not part of the system.

## Resources Used

1. [JavaScript Execution Context – How JS Works Behind The Scenes](https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/)
2. [Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API)
3. [Introduction to Node.js](https://nodejs.dev/en/learn)
4. [npm](https://www.npmjs.com/)

## What we covered?

- What is backend development?
- It's usecase.
- What we will learn in the upcoming sessions?
- What is Node.js? Installing Node.js.
- Checking if Node.js is installed.
- Differneces between Modules and Packages.
  - A better explaination is here - <https://stackoverflow.com/questions/20008442/difference-between-a-module-and-a-package-in-node-js>

**Notion Page:** <https://kunal-keshan.notion.site/Getting-Started-with-Backend-Node-af73a67815f6496482f21de4ae33b1e4?pvs=4> - Refer for additional information.
