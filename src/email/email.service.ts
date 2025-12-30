import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import { sendEmailDTO } from './dto/email.dto';

@Injectable()
export class EmailService {
    constructor(private readonly configService: ConfigService) {}

    async emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD')
            },
        })
        return transporter;
    }

    async sendEmail(sendEmailDto: sendEmailDTO) {
        const {recipients, subject, html} = sendEmailDto;
        const transport = await this.emailTransport();
        const options: nodemailer.SendEmailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: recipients,
            subject: subject,
            html: html,
        };

        try {
            await transport.sendMail(options);
            return {message: 'Email sent successfully'}
        } catch (error) {
            return {message: 'Error sending mail: ', error};

        }
    }
}
