import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService:JwtService) { 
    console.log('JWT Secret:', (jwtService as any).secret);

  }

  generateToken(user: User): string {
    const payload = { userId: user.user_id, organizationId: user.organization_id, email: user.email };
    return this.jwtService.sign(payload);
  }

}