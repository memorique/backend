import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { JwtMiddleware } from './modules/auth/jwt/jwt.middleware';
import { AuthService } from './modules/auth/auth.service';
import { ExternalModule } from './modules/external/external.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.production`
    }),
    DatabaseModule,
    UserModule,
    ExternalModule,
    CommonModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports: [AuthService, CommonModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude(
      { path: 'user/create', method: RequestMethod.POST },
      { path: 'user/login', method: RequestMethod.POST },
      { path: 'contactus/create', method: RequestMethod.POST },
      { path: 'newsletter/create', method: RequestMethod.POST },
    ).forRoutes("*")
  }
}
