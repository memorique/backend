import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
  }

  async login(user: User) {
    const payload = {
      user_id: user.user_id,
      email: user.email,
      organization_id: user.organization_id,
    };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          user_id: user.user_id,
          email: user.email,
          organization_id: user.organization_id,
          role: user.role,
        },
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });
      const user = await this.userRepository.findOne({
        where: { user_id: payload.userId },
      });

      if (!user) throw new UnauthorizedException('User not found');

      return this.login(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
