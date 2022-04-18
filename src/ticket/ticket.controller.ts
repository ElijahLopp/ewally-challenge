import { Controller, Get, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ValidationCode } from '../pipes/validation.pipe';
import { TicketResponse } from './interfaces/ticket.interface';

@Controller('boleto')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('')
  async getHello(): Promise<string> {
    return 'Hello Worlds';
  }

  @Get(':code')
  async getInformations(
    @Param('code', ValidationCode) code: string,
  ): Promise<TicketResponse> {
    return this.ticketService.getInformations(code);
  }
}
