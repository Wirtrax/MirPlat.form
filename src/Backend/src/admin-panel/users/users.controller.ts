import { UsersService } from './users.service';
import { Controller, Get, Patch, Post, Body, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { SuperAdminGuard } from '../auth/guards/super-admin.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

        @UseGuards(JwtGuard, RolesGuard)
        @Get()
        getAllUsers() {
            return this.usersService.getAllUsers();
        }

        @UseGuards(JwtGuard, RolesGuard)
        @Post()
        addNewUser(@Body() user: User) {
            return this.usersService.addNewUser(user);
        }

        @UseGuards(JwtGuard, RolesGuard, SuperAdminGuard)
        @Delete(':id')
        deleteUser(@Param('id', ParseIntPipe) id: number) {
            return this.usersService.deleteUser(id);
        }
        
        @UseGuards(JwtGuard, RolesGuard)
        @Patch(':id')
        updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes) {
            return this.usersService.updateUser(id, changes);
        }
}
