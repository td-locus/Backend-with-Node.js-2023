const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kk1738@srmist.edu.in',
        pass: process.env.NODE_MAILER_PASS
    }
})

async function sendEmail() {
    try {
        const info = await transporter.sendMail({
            from: '"Kunal from SRM" <kk1738@srmist.edu.in>',
            to: 'aswani002001@gmail.com, kunalkeshan12@gmail.com',
            subject: 'this email is from my custom node.js application',
            text: 'Hiiii',
            html: '<b>Hi, Harsh!</b>'
        })
        console.log(info)
    } catch (error) {
        console.log(error);
    }
}

sendEmail()