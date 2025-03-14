import * as nodemailer from "nodemailer";
import config from './config';

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    async sendMail() {


        
        let mailOptions = {
            from: config.user,
            to: this.to,
            subject: this.subject,
            html: this.message,
            // attachments: [{
            //     filename: 'ass.jpg',
            //     path: __dirname+ '/ass.jpg',
            //     cid: 'signature@email' //same cid value as in the html img src
            // },{
            //     filename: 'topImage.png',
            //     path: __dirname+ '/topImage.png',
            //     cid: 'topImage@email' //same cid value as in the html img src
            // }]
        };



        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        });


        

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }


}

export default new Mail;