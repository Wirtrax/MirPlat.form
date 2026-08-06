import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Admin, AdminRole } from 'src/entities/admins.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const adminRole = request['role'];

    if(!adminRole) {
      throw new UnauthorizedException('Админ не авторизован')
    }

    if (adminRole !== AdminRole.ADMIN && adminRole !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Недостаточно прав')
    }

    return true;
  }
}