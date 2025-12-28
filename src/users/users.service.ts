import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, UserSchema } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor( @InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDTO) {
        // try {
        //     if(!name)
        // } catch (error) {
            
        // }

        const userAlreadyExists = await this.userModel.findOne( createUserDto.email);
        if (userAlreadyExists) {
            throw new ConflictException("User already exists!");
        }
    }

}
