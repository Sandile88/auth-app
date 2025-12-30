import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // @Get('email/:email')
    // getByEmail(@Param('email') email: string) {
    //     return this.usersService.findByEmail(email);
    // }

    // @Get(':id')
    // getById(@Param('id') id: string) {
    //     return this.usersService.findById(id);
    // }

    @Post()
    create(@Body() createUserDto: CreateUserDTO) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
        return this.usersService.updateUserDetails(id, updateUserDto);
    }

    // @Delete(':id')
    // removeUser(@Param('id') id: string) {
    //     return this.usersService.deleteUser(id);
    // }

    // @Patch(':id/verify')
    // updateVerificationStatus(@Param('id') id: string) {
    //     return this.usersService.markUserAsVerified(id);
    // }

    @Patch(':id/login')
    updateLastLoginDate(@Param('id') id: string) {
        return this.usersService.updateLastLogin(id);
    }

    // @Patch(':id/deactivate')
    // deactiveUserStatus(@Param('id') id: string) {
    //     return this.usersService.deactivateUser(id);
    // }

}
