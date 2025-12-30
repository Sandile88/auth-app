import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user) {
        return this.usersService.findById(user.userId);
    }

    
    @Patch('me')
    @UseGuards(JwtAuthGuard)
    updateUser(@CurrentUser() user, @Body() updateUserDto: UpdateUserDTO) {
        return this.usersService.updateUserDetails(user.userId, updateUserDto);
    }


}
