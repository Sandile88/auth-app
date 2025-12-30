// import { Injectable } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
// import { RegisterDTO } from './dto/register.dto';
// import { LoginDTO } from './dto/login.dto';
// import { ForgotPasswordDTO } from './dto/forgot-password.dto';
// import * as bcrypt from 'bcrypt';
// import { User } from 'src/users/schemas/user.schema';

// @Injectable()
// export class AuthService {
//     constructor(private usersServices: UsersService) {}

//     async registerUser(name: string, email: string, password: string, registerDto: RegisterDTO) {
        
//         const user = await this.usersServices.createUser(registerDto);  
//         // const hashedPassword = await bcrypt.hash(password, 12);
//         // const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
//         // const newUser = new User({
//         //     name, email, password: hashedPassword, verificationToken
//         // })

        
//     }

    
//     async validateUser(email: string, password: string) {

//         const user = await this.usersServices.findByEmail(email);
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if(!isValidPassword) {
//             return null;
//         }
//         return user;
//     }
    
//     async login(loginDto: LoginDTO) {
//         // const 
//     }

//     async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
//         const user = await this.usersServices.findByEmail(forgotPasswordDto.email);
//         const resetToken = crypto.getRandomValues();

//         await this.usersServices.se
//     }

//     async resetPassword() {

//     }
// }
