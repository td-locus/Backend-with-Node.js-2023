const express = require('express');
const Student = require('./Student');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger);
app.use(express.static(path.join(__dirname)))

let students = []; // Psuedo database not real one, 

function reqLogger(req, res, next) {
    console.log(`${req.method}: ${req.url}`);
    next();
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/api/students', (req, res) => {
    const { name, dept, regNo } = req.body;
    const newStudent = new Student(name, dept, regNo);
    students.push(newStudent);
    res.status(201).json({ message: 'student created' })
})

app.get('/api/students', (req, res) => {
    res.status(200).json({ message: 'all students fetched', students });
})

app.get('/api/students/:regNo', (req, res) => {
    const { regNo } = req.params;
    const student = students.find((ele) => ele.regNo === regNo);
    if (student) {
        res.status(200).json({ message: 'student found', student });
    } else {
        res.status(404).json({ message: 'student does not exist' });
    }
})

app.patch('/api/students/:regNo/name', (req, res) => {
    const { regNo } = req.params;
    const { name } = req.body;
    students = students.map((student) => {
        if (student.regNo === regNo) {
            student.name = name;
        }
        return student;
    })
    res.status(200).json({ message: 'student updated' });
})

app.delete('/api/students/:regNo', (req, res) => {
    const { regNo } = req.params;
    const index = students.findIndex((ele) => ele.regNo === regNo);
    if (index > -1) {
        students.splice(index, 1);
        res.status(200).json({ message: 'student deleted' })
    } else {
        res.status(404).json({ message: 'student does not exist' });
    }
})

app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000')
})