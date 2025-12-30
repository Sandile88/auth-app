import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule, JwtModule.register({ 
        secret: 'JWT_SECRET', signOptions: {expiresIn: '1d'}})],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthController]
})
export class AuthModule {
}

