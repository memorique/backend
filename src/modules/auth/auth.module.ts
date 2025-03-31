import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: "3787b91ea64dce0c6e0bc76974964506a5199e7c51e5d885f16043c4159b82a8",
      signOptions: { expiresIn: '30d' },
    })
  ],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService,JwtModule],  // Expose AuthService to other modules
})
export class AuthModule { }