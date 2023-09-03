const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})



