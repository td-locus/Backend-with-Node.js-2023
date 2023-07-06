// Dependencies
const express = require('express');
const Student = require('./Student');
const connection = require('./utils/database');

// Initializing Application
const app = express();

function reqLogger(req, res, next) {
    console.log(`${req.method}: ${req.url}`);
    next();
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger)

// Student Management REST API

const students = [];

// Create a Student

app.post('/api/students', (req, res) => {
    const { name, regNo, dept } = req.body;
    const newStudent = new Student(name, dept, regNo);
    students.push(newStudent);
    return res.status(201).json({ message: 'New Student Created' });
});

// Read all students

app.get('/api/students', (req, res) => {
    return res.status(200).json({
        message: 'All student details fetched',
        students
    })
});

// Read a student by regNo

app.get('/api/students/:regNo', (req, res) => {
    const { regNo } = req.params;
    const student = students.find((ele) => ele.regNo === regNo);
    if (student) {
        return res.status(200).json({ message: 'Student found', student });
    }
    return res.status(404).json({ message: 'Student with give regNo does not exist' });
});

// Update Student Details

app.patch('/api/student/:regNo/name', (req, res) => {
    const { regNo, name } = req.params;
    students.forEach((student) => {
        if (student.regNo === regNo) {
            student.name = name;
        }
    });
    return res.status(200).json({ message: 'Student updated' });
});

// Delete A student

app.delete('/api/student/:regNo', (req, res) => {
    const { regNo, name } = req.params;
    const position = students.findIndex((ele) => ele.regNo === regNo);
    if (position > -1) {
        students.splice(position, 1);
        return res.status(200).json({ message: 'Student deleted' });
    }
    return res.status(404).json({ message: 'Student with give regNo does not exist' })
});


connection.promise().connect().then(() => {
    console.log('✅ Connected to Database.')
    app.listen(5000, () => {
        console.log('✅ Server running on http://localhost:5000.')
    });
}).catch((err) => {
    console.log('❌ Unable to Connect to Database!');
    console.log(err)
})
