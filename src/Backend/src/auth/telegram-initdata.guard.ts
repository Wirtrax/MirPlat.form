import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isValid, parse } from '@telegram-apps/init-data-node';
import { Request } from 'express';
import { validate } from 'class-validator';

@Injectable()
export class TelegramInitdataGuard implements CanActivate {
  constructor(private readonly botToken: string) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest<Request>();

    // const initData = request.body;

    // if(!initData) {
    //   throw new BadRequestException('initData обязателен');
    // }

    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new UnauthorizedException('Нет хэдера')
    }

    const [authType, initData = ''] = authHeader.split(' ');

    if (authType !== 'tma') {
      throw new UnauthorizedException('Неподдерживаемый тип авторизации. Необходим "tma"');
    }

    if (!initData) {
      throw new UnauthorizedException('initData отсутствует')
    }

    const isValidData = isValid(initData, this.botToken);

    if (!isValidData) {
      throw new UnauthorizedException('Невалидные данные');
    }

    try {
      const parsed = parse(initData);
      const tgUser = parsed.user;

      if(!tgUser?.id) {
        throw new BadRequestException('Нет id пользователя');
      }

      request['tgUser'] = tgUser;
      request['parsedInitData'] = parsed;

      return true;
    } catch (error) {
      throw new UnauthorizedException(`Ошибка авторизации`);
    }
  }
}
