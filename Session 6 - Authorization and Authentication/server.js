// Dependencies
const express = require('express');
const connection = require('./utils/database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const CREDENTIALS = {
    username: 'kunal',
    password: '123',
    secret: 'hello, this is a secret'
}

// Initializing Application
const app = express();

app.set('view engine', 'ejs')

function reqLogger(req, res, next) {
    console.log(`${req.method}: ${req.url}`);
    next();
}

function auth(req, res, next) {
    try {
        const { authToken } = req.cookies;
        if (authToken) {
            const decoded = jwt.verify(authToken, CREDENTIALS.secret);
            if (decoded.username) {
                next();
            } else throw new Error('Not allowed')
        } else throw new Error('Not allowed')
    } catch (error) {
        console.log(error);
        res.render('error', { ...error, message: error.message })
    }
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // req.cookies
app.use(reqLogger)

// Student Management REST API

app.get('/', (req, res) => {
    return res.render('index')
})


// login user (someone who has access)

app.post('/api/login', (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            const token = jwt.sign({ username }, CREDENTIALS.secret);
            res.cookie('authToken', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.status(200).send('login successful');
        } else {
            throw new Error('Invalid Credentials');
        }
    } catch (error) {
        console.log(error);
        res.render('error', { ...error, message: error.message })
    }
})

// Create a Student

app.post('/api/students', auth, async (req, res) => {
    try {
        const { name, regNo, dept } = req.body;
        await connection.promise().query(`INSERT INTO students (name, dept, reg_no) VALUES ('${name}', '${dept}', '${regNo}')`);
        return res.redirect(`/students/${regNo}`)
    } catch (error) {
        console.log(error);
        res.render('error', { ...error })
    }
});

// Read all students

app.get('/students', async (req, res) => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM students')
        return res.render('students', { students: rows })
    } catch (error) {
        console.log(error);
        res.render('error', { ...error })
    }
});

// Read a student by regNo

app.get('/students/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;
        const [rows] = await connection.promise().query(`SELECT * FROM students WHERE reg_no='${regNo}'`);
        if (rows.length > 0 && rows[0]) {
            return res.render('student', { ...rows[0] })
        }
        return res.render('error', { message: 'Student with give regNo does not exist' });
    } catch (error) {
        console.log(error);
        res.render('error', { ...error })
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
        res.render('error', { ...error })
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
        res.render('error', { ...error })
    }
});

// read cookies

app.get('/cookies', (req, res) => {
    console.log(req.cookies)
    res.status(200).end()
});

// create cookie

app.post('/cookies/create', (req, res) => {
    res.cookie('myCookie', 'kunal keshan', { httpOnly: true, maxAge: 60000 })
    res.status(200).end('cookie created!')
})


connection.promise().connect().then(() => { // handshake
    console.log('✅ Connected to Database.')
    app.listen(5000, () => {
        console.log('✅ Server running on http://localhost:5000.')
    });
}).catch((err) => {
    console.log('❌ Unable to Connect to Database!');
    console.log(err)
})

// const MY_SECRETE = 'MY_SECRET';

// console.log(jwt.sign('kunal keshan', MY_SECRETE));

// const signed = 'eyJhbGciOIJIUzI1NiJ9.a3VuYWwga2VzaGFu.h5bCax2F52LmNjQ-GDaqcQThwjaJpHXVnnMWd9WX3Wg';

// console.log(jwt.verify(signed, MY_SECRETE))