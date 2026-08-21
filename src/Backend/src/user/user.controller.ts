import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TelegramInitdataGuard } from 'src/auth/telegram-initdata.guard';
import type { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt.guard';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { TelegramInitDataAuth } from 'src/auth/tma.decorator';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @JWTAuth()
  findOneById(@Req() req: Request){
    return this.userService.findOneById(req['userId'])  
  }

  @Post()
  @TelegramInitDataAuth()
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto, req['tgUserId']);
  }

  @Delete()
  @JWTAuth()
  delete(@Req() req: Request){
    return this.userService.delete(req['userId']);
  }
  @Patch()
  @JWTAuth()
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(updateUserDto, req['userId']);
  }

  @Get("rand")
  getRand(){
    return this.userService.getOneRandom();
  }
}
