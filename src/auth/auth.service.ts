import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService) {}

    async registerUser(registerDto: RegisterDTO) {
        
        const user = await this.usersServices.createUser(registerDto);  
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        await this.usersServices.setVerificationToken(user._id.toString(), verificationToken)
        
        //send verification email
        // generate jwt token

        // return {}
        
    }

    
    async validateUser(email: string, password: string) {

        const user = await this.usersServices.findByEmail(email);
        // if (!user) {}
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return   null;
        }
        return user;
    }
    
    async login(loginDto: LoginDTO) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        // if(!user) {}
        // also add check of active user

        await this.usersServices.updateLastLogin(user._id.toString());
        // generate jwt token

        //return {}
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
        const user = await this.usersServices.findByEmail(forgotPasswordDto.email);
        // if(!user) {}
        const resetToken = randomBytes(12).toString('hex');  //crypto dependency not being read
        const hashedToken = await bcrypt.hash(resetToken, 10)
        const expires = new Date(Date.now() + 600000) //10 

        await this.usersServices.setResetPasswordToken(user._id.toString(), hashedToken, expires);

        // send email with the reset token


    }

    async resetPassword(token: string, newPassword: string) {        
        const user = await this.usersServices.findByResetToken(token);
        // if(!user) {}
        // if (user.resetPasswordExpires < Date.now()) {

        // }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await this.usersServices.updatePassword(user._id.toString(), hashedPassword);
    }
}
