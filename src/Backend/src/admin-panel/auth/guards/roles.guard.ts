import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Admin, AdminRole } from 'src/entities/admins.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core/services/reflector.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const adminRole = request['role'];
  

    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) { 
      return true;
    }

    if(!adminRole) {
      throw new UnauthorizedException('Админ не авторизован')
    }

    if (adminRole !== AdminRole.ADMIN && adminRole !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Недостаточно прав')
    }

    return true;
  }
}