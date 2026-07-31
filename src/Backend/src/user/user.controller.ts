import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TelegramInitdataGuard } from 'src/auth/telegram-initdata.guard';
import type { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  findOneById(@Req() req: Request){
    return this.userService.findOneById(req['userId'])  
  }

  @Post()
  @UseGuards(TelegramInitdataGuard)
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto, req['tgUserId']);
  }

  @Delete()
  @UseGuards(JwtGuard)
  delete(@Req() req: Request){
    return this.userService.delete(req['userId']);
  }
  @Patch()
  @UseGuards(JwtGuard)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(updateUserDto, req['userId']);
  }
}
