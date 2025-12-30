import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { sendEmailDTO } from './dto/email.dto';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('send')
    async sendMail(@Body() sendEmailDto: sendEmailDTO) {
        await this.emailService.sendEmail(sendEmailDto);
        return {message: 'Email sent successfully!'}
    }
}
