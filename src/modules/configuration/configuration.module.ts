import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './configuration.service';
import { ConfigurationSchema } from './configuration.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Configuration', schema: ConfigurationSchema }])],
  controllers: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule { }