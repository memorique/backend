import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: any;
    private sender: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SES_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.SES_USER,
                pass: process.env.SES_PASSWORD
            },
        });

        this.sender = process.env.SES_FROM;
    }

    send(mailOptions: any) {
        mailOptions.from = this.sender;
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    }

}