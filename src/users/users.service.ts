import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor( @InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDTO) {
        // try {
        //     if(!name)
        // } catch (error) {
            
        // }

        const userAlreadyExists = await this.userModel.findOne({ email: createUserDto.email});
        if (userAlreadyExists) {
            throw new ConflictException("User already exists!");
        }

        const user = new this.userModel({
            ...createUserDto
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
        return this.userModel.findByIdAndUpdate(userId, {isVerified: true});
    }

    async updateLastLogin(userId: string) {
        return this.userModel.findByIdAndUpdate(userId, {lastLogin: new Date()});
    }

    async deactivateUser(userId: string) {
        return this.userModel.findByIdAndUpdate(userId, {isActive: false});
    }

}
