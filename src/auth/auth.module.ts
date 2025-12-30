import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { EmailService } from 'src/email/email.service';

@Module({
    imports: [UsersModule, JwtModule.register({ 
        secret: 'JWT_SECRET', signOptions: {expiresIn: '1d'}}), EmailService],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}

