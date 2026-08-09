import { UsersService } from './users.service';
import { Controller, Get, Patch, Post, Body, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { SuperAdminGuard } from '../auth/guards/super-admin.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

        @Get()
        getAllUsers() {
            return this.usersService.getAllUsers();
        }
        @Post()
        addNewUser(@Body() user: User) {
            return this.usersService.addNewUser(user);
        }
        @UseGuards(SuperAdminGuard)
        @Delete(':id')
        deleteUser(@Param('id', ParseIntPipe) id: number) {
            return this.usersService.deleteUser(id);
        }
    
        @Patch(':id')
        updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes) {
            return this.usersService.updateUser(id, changes);
        }
}
