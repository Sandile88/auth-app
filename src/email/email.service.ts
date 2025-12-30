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

        async sendVerificationEmail(email: string, token: string) {
        return this.sendEmail({
            recipients: [email],
            subject: 'Verify your email',
            html: `
                <h1>Email Verification</h1>
                <p>Your verification code is: <strong>${token}</strong></p>
                <p>This code will expire in 1 hour.</p>
            `,
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        // const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        //     <h1>Password Reset</h1>
        //     <p>Click the link below to reset your password:</p>
        //     <a href="${resetLink}">Reset Password</a>
        //     <p>This link will expire in 1 hour.</p>
        //     <p>If you didn't request this, please ignore this email.</p>
        // `,
        return this.sendEmail({
            recipients: [email],
            subject: 'Reset your password',
            html: `
                <h1>Password Reset</h1>
                <p>Your password reset token is: <strong>${token}</strong></p>
                <p>Use this token to reset your password via the API:</p>
                    <pre>
                    POST /auth/reset-password
                    {
                    "token": "${token}",
                    "newPassword": "your-new-password"
                    }
                    </pre>
                <p>This token will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        });
    }




}
