import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/entities/admins.entity';
import { JwtService } from '@nestjs/jwt';
import { AdminRole } from 'src/entities/admins.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepo: Repository<Admin>,
        
        private readonly jwtService: JwtService
    ) {}

    async register(login: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        const admin = this.adminRepo.create({ 
            login: login, 
            password_hash: hash,
            role: AdminRole.ADMIN});

        await this.adminRepo.save(admin);

        return { id: admin.id, login: admin.login, role: admin.role };
    }

    async login(login: string, password: string) {
        const admin = await this.adminRepo.findOne({ where: {login}});
        if (!admin) throw new UnauthorizedException("Неверный логин или пароль");

        const valid = await bcrypt.compare(password, admin.password_hash);
        if(!valid) throw new UnauthorizedException("Неверный логин или пароль");

        const token = await this.jwtService.signAsync({
            sub: admin.id,
            role: admin.role,
        });
        return { access_token: token }
    }
}
