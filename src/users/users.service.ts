import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor( @InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDTO) {
        const userAlreadyExists = await this.userModel.findOne({ email: createUserDto.email});
        if (userAlreadyExists) {
            throw new ConflictException("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        // const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword
            // name: createUserDto.name,
            // email: createUserDto.email,
            // password: hashedPassword,
        })

        return user.save();
    }

    async findByEmail( email: string) {
        return this.userModel.findOne({ email });
    }

    async findById(userId: string) {
        return this.userModel.findById(userId);
    }

    async updateUserDetails(userId: string, updates: UpdateUserDTO) { //Partial<CreateUserDTO>
        return this.userModel.findByIdAndUpdate(userId, updates, { new: true });
    }

    async deleteUser(userId: string) {
        return this.userModel.findByIdAndDelete(userId);
    }

    async markUserAsVerified(userId: string) {
        return this.userModel.findByIdAndUpdate(userId, {isVerified: true, verificationToken: null}, {new: true}); //explain this
    }

    async updateLastLogin(userId: string) {
        return this.userModel.findByIdAndUpdate(userId, {lastLogin: new Date()}, {new: true});
    }

    async deactivateUser(userId: string) {
        return this.userModel.findByIdAndUpdate(userId, {isActive: false}, {new: true});
    }

    async setVerificationToken(userId: string, token: string) {
        return this.userModel.findByIdAndUpdate(userId, {verificationToken: token}, { new: true});
    }

    async setResetPasswordToken(userId: string, token: string, expires: Date) {
        return this.userModel.findByIdAndUpdate(userId, {resetPasswordToken: token, resetPasswordExpires: expires}, {new: true});
    }

    async updatePassword(userId: string, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        return this.userModel.findByIdAndUpdate(userId, {password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null}, {new: true});
    }

    async findByResetToken(token: string) {
        return this.userModel.findOne({ resetPasswordToken: token , resetPasswordExpires: {$gt: new Date()}});
    }



}
