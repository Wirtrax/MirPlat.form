import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin, AdminRole } from '../../entities/admins.entity';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(login: string, password: string): Promise<any> {
    const admin = await this.adminRepository.findOne({ where: { login } });
    
    if (!admin) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const { password_hash, ...result } = admin;
    return result;
  }

  async login(admin: any) {
    const payload = { 
      sub: admin.id, 
      login: admin.login, 
      role: admin.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        login: admin.login,
        role: admin.role,
      },
    };
  }

  async register(login: string, password: string, role: AdminRole = AdminRole.ADMIN) {
    const existingAdmin = await this.adminRepository.findOne({ where: { login } });
    
    if (existingAdmin) {
      throw new UnauthorizedException('Администратор с таким логином уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = this.adminRepository.create({
      login,
      password_hash: hashedPassword,
      role,
    });

    await this.adminRepository.save(admin);
    
    const { password_hash, ...result } = admin;
    return result;
  }
}