import { Body, Controller, Param, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDTO) {
        return this.authService.registerUser(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDTO) {
        return this.authService.userLogin(loginDto);
    }

    @Post('forgot-password')
    forgotPwd(@Body() forgotPasswordDto: ForgotPasswordDTO) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post('reset-password')
    resetPwd(@Param('token') token: string, newPassword: string) {
        return this.authService.resetPassword(token, newPassword);
    }

    // @Post('verify-email')
    // @verifyEmail(@Param() email: string) {

    // }

}
