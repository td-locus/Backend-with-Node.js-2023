// Dependencies
const express = require('express');
const connection = require('./utils/database');

// Initializing Application
const app = express();

app.set('view engine', 'ejs')

function reqLogger(req, res, next) {
    console.log(`${req.method}: ${req.url}`);
    next();
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger)

// Student Management REST API

// Create a Student

app.post('/api/students', async (req, res) => {
    try {
        const { name, regNo, dept } = req.body;
        const response = await connection.promise().query(`INSERT INTO students (name, dept, reg_no) VALUES ('${name}', '${dept}', '${regNo}')`);
        return res.status(201).json({ message: 'New Student Created' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Read all students

app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM students')
        return res.status(200).json({
            message: 'All student details fetched',
            students: rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Read a student by regNo

app.get('/api/students/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;
        const [rows] = await connection.promise().query(`SELECT * FROM students WHERE reg_no='${regNo}'`);
        if (rows.length > 0 && rows[0]) {
            return res.render('student', { ...rows[0] })
        }
        return res.status(404).json({ message: 'Student with give regNo does not exist' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update Student Details

app.patch('/api/students/:regNo/name', async (req, res) => {
    try {
        const { regNo } = req.params;
        const { name } = req.body
        const response = await connection.promise().query(`UPDATE students SET name='${name}' WHERE reg_no='${regNo}'`)
        return res.status(200).json({ message: 'Student updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete A student

app.delete('/api/students/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;
        const response = await connection.promise().query(`DELETE FROM students WHERE reg_no='${regNo}'`)
        return res.json({ message: 'Student Deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


connection.promise().connect().then(() => { // handshake
    console.log('✅ Connected to Database.')
    app.listen(5000, () => {
        console.log('✅ Server running on http://localhost:5000.')
    });
}).catch((err) => {
    console.log('❌ Unable to Connect to Database!');
    console.log(err)
})
