import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    generateToken(userId: number): string {
        return this.jwtService.sign({ userId });
    }

}    
