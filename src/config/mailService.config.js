const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tennesseelanguagecenter@gmail.com',
        pass: 'lepo irct lqlj tkiw'
    }
});

module.exports = transporter



