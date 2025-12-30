import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersServices: UsersService,
        private jtwService: JwtService
    ) {}

    async registerUser(registerDto: RegisterDTO) {
        const user = await this.usersServices.createUser(registerDto);  
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        await this.usersServices.setVerificationToken(user._id.toString(), verificationToken)
        
        //send verification email
        
        const tokenPayload = {
            sub: user._id,
            email: user.email
        };
        const accessToken = await this.jtwService.signAsync(tokenPayload);

        return {
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isVerified: user.isVerified,
            },
            message: 'Registration successful. Please verify your email.'
        }
        
    }

    
    async validateUser(email: string, password: string) {

        const user = await this.usersServices.findByEmail(email);
        if (!user) { 
            return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return   null;
        }

        return user;
    }
    
    async userLogin(loginDto: LoginDTO) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if(!user.isActive) {
            throw new UnauthorizedException('Account is deactivated');
        }

        if(!user.isVerified) {
            throw new UnauthorizedException('Please verify your email first');
        }

        await this.usersServices.updateLastLogin(user._id.toString());
        
        
        const tokenPayload = {
            sub: user._id,
            email: user.email
        };
        const accessToken = this.jtwService.sign(tokenPayload);

        return {
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isVerified: user.isVerified,
            },
        }  
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
        const user = await this.usersServices.findByEmail(forgotPasswordDto.email);
        if(!user) {
            return {message: 'If email exists, reset link will be sent'}
        }
        const resetToken = randomBytes(12).toString('hex'); 
        const hashedToken = await bcrypt.hash(resetToken, 10)
        const expires = new Date(Date.now() + 600000) //10 

        await this.usersServices.setResetPasswordToken(user._id.toString(), hashedToken, expires);

        // send email with the reset token


    }

    async resetPassword(token: string, newPassword: string) {        
        const user = await this.usersServices.findByResetToken(token);
        if(!user) {
            throw new BadRequestException('Invalid or expired reset token')
        }
        // if (user.resetPasswordExpires < Date.now()) {

        // }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await this.usersServices.updatePassword(user._id.toString(), hashedPassword);
    }
}
