import { Controller, Post } from '@nestjs/common';
import { StripService } from './strip.service';

@Controller('strip')
export class StripController {
  constructor(private readonly stripService: StripService) {}

  @Post('create-checkout-session')
  async createCheckoutSession() {
    const session = await this.stripService.createCheckoutSession();
    console.log('Session created:', session);
    return { url: session.session.url }; // Return the session URL to redirect the client
  }
}
