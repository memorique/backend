import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: "mongodb+srv://memorique:37pSQsX0V89HmOMr@cluster0.rz9s8.mongodb.net/memorique?retryWrites=true&w=majority&appName=Cluster0",
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}