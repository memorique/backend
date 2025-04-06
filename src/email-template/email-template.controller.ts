import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('emailTemplate')
@UseGuards(JwtAuthGuard)
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) { }

  @Post('create')
  create(
    @Body() createEmailTemplateDto: CreateEmailTemplateDto,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.emailTemplateService.create(createEmailTemplateDto, user);
  }

  @Get('list')
  findAll(@Req() request: Request & { user: Partial<User> }, @Query() query: any) {
    const user = request.user;
    return this.emailTemplateService.findAll(user, query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.emailTemplateService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: UpdateEmailTemplateDto,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.emailTemplateService.update(id, updateEmailTemplateDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.emailTemplateService.remove(id, user);
  }
}
