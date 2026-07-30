import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AfterUpdate } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOneById(@Param('id') id: number){
    return this.userService.findOneById(id)  
  }

  @Post(':id')
  create(@Param('id') id: number, @Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number){
    return this.userService.delete(id);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(updateUserDto, id);
  }
}
