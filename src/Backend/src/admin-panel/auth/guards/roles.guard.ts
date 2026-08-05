import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Admin } from '../../../entities/admins.entity';
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
    const adminId = request['userId'];

    if(!adminId) {
      throw new UnauthorizedException('Админ не авторизован')
    }

    const admin = await this.adminsRepository.findOne({
      where: { id: adminId}
    })

    if (!admin) {
      throw new UnauthorizedException('Админ не найден')
    }

    const role = admin.role;

    if (!role) {
      throw new ForbiddenException('Недостаточно прав для доступа');
    }

    request['role'] = role;

    return true;
  }
}