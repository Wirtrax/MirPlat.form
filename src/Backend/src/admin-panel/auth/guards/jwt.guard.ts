import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core/services/reflector.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// (ПОЧТИ) Копия jwt.guard.ts с ветки авторизации пользователей,
// при слиянии нужно оставить одну копию и ссылаться на неё

@Injectable()
export class JwtGuard implements CanActivate {
  constructor( 
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector 
  ){}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [ ]
    return type === 'Bearer' ? token : undefined;
  }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      const isPublic = this.reflector.get('isPublic', context.getHandler());
      if (isPublic) { 
        return true;
      }

      if(!token){
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token);
        request['id'] = payload.sub;
        request['role'] = payload.role;
        
      } catch {
        throw new UnauthorizedException();
      }
      return true;
  }
}