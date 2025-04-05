import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailTemplateModule } from './email-template/email-template.module';
import { OccasionModule } from './occasion/occasion.module';
import { PriceModule } from './price/price.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available across modules
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Load correct env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''), // Empty string for no password
        database: configService.get<string>('DB_NAME', 'users'),
        autoLoadEntities: true,
        synchronize: true, // Use only in development
      }),
    }),
    AuthModule,
    UsersModule,
    OrganizationModule,
    EmailTemplateModule,
    OccasionModule,
    PriceModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule { }
