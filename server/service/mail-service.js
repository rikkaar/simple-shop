const nodemailer = require('nodemailer')
const {render} = require("express/lib/application");
const uuid = require("uuid");
const {User} = require("../models/models");

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

    async sendActivationMail(to) {
        const activationLink = uuid.v4()
        const link = `http://localhost:5000/api/user/activate/${activationLink}`
        console.log(link)
        // await this.transporter.sendMail({
        //     from: process.env.SMTP_USER,
        //     to,
        //     subject: "Активация аккаунта на gay-website",
        //     text: '',
        //     html: `<div><h1>Подтверждение регистрации</h1><a href="${link}">${link}</a></div>`
        // })
        const user = await User.findOne({where: {email: to}})
        await user.update({activationLink})
    }
}

module.exports = new MailService()