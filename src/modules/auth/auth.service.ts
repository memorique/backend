import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  generateToken(user: User): string {
    const payload = { userId: user.userId, organizationId: user.organizationId, email: user.email };
    return this.jwtService.sign(payload);
  }

}