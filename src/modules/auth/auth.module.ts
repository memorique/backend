import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', 
      signOptions: { expiresIn: '30 days' }, 
    })
  ],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService],  // Expose AuthService to other modules
})
export class AuthModule {}