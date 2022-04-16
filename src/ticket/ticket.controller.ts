import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('boleto')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('test/:code')
  getHello(@Param('code', ParseIntPipe) code: number): string {
    return this.ticketService.getHello();
  }

  @Get(':code')
  async getInformations(
    @Param('code', ParseIntPipe) code: number,
  ): Promise<number> {
    return this.ticketService.getInformations(code);
  }
}
