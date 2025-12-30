import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule, 
        EmailModule, 
        PassportModule ,
        JwtModule.registerAsync({ 
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), 
            signOptions: {
                expiresIn: '1d',
                },
        }),
        inject: [ConfigService],
    }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],

})

export class AuthModule {}

