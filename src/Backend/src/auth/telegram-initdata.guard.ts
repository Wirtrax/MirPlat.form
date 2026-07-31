import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isValid, parse } from '@tma.js/init-data-node';
import { Request } from 'express';

@Injectable()
export class TelegramInitdataGuard implements CanActivate {
  private readonly botToken: string;

  constructor() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
       throw new Error('TELEGRAM_BOT_TOKEN не задан в .env')
    }
    this.botToken = botToken;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new UnauthorizedException('Authrorization is requered')
    }

    const [authType, initData = ''] = authHeader.split(' ');

    if (authType !== 'tma') {
      throw new UnauthorizedException('Only tma authorization is supported');
    }

    if (!initData) {
      throw new UnauthorizedException('Invalid token')
    }

    const isValidData = isValid(initData, this.botToken);
    if (!isValidData) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const parsed = parse(initData);
      const tgUser = parsed.user;

      if(!tgUser?.id) {
        throw new BadRequestException('User id is required');
      }
      request['tgUserId'] = tgUser.id;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Authentication error`);
    }
  }
}
