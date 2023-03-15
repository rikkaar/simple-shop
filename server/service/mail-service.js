const nodemailer = require('nodemailer')
const {render} = require("express/lib/application");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: 'gmail',
            secure: false,
            requireTLS: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_GOOGLE_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        //     let config = {
        //
        //         service: 'gmail',
        //         secure: false,
        //         requireTLS: true,
        //         logger: true,
        //         debug: true,
        //         host: process.env.SMTP_HOST,
        //         port: process.env.SMTP_PORT,
        //         auth: {
        //             user: process.env.SMTP_USER,
        //             pass: process.env.SMTP_GOOGLE_PASSWORD
        //         }
        //     }
        //     let transporter = nodemailer.createTransport(config);
        //     let message = {
        //         from: process.env.SMTP_HOST,
        //         to: to,
        //         subject: "Place Order",
        //         text: 'Hi'
        //         // html: `<div><h1>Подтверждение регистрации</h1><a href="${link}">${link}</a></div>`
        //     }
        //
        //     await transporter.sendMail(message)

        // res.status(201).json("getBill Successfully...!");


        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта на gay-website",
            text: '',
            html: `<div><h1>Подтверждение регистрации</h1><a href="${link}">${link}</a></div>`
        })
    }
}

module.exports = new MailService()