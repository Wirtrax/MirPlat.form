import { Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import { AdminRole } from "src/entities/admins.entity";

@Injectable()
export class SuperAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const adminRole = request['role'];
        
        if(adminRole !== AdminRole.SUPER_ADMIN) {
            throw new ForbiddenException('Недостаточно прав, требуется superAdmin');
        }
        return true;
    }
}

