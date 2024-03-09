import nodemailer from 'nodemailer'
export default transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tennesseelanguagecenter@gmail.com',
        pass: 'lepo irct lqlj tkiw'
    }
});



