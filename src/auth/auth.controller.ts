import { Body, Controller, Param, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';


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
    resetPwd(@Body() resetPasswordDto: ResetPasswordDTO) {
        return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
    }

    @Post('verify-email')
    verifyUserEmail(@Body() body: { token: string}) {
        return this.authService.verifyEmail(body.token);
    }

}
