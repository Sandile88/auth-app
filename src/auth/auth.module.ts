import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, JwtModule.register({ 
        secret: 'JWT_SECRET', signOptions: {expiresIn: '1d'}})],
    providers: [AuthService]
})
export class AuthModule {
}

