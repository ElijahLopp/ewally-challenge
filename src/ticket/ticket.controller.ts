import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ValidationCode } from '../pipes/validation.pipe';
import { TicketResponse } from './interfaces/ticket.interface';

@Controller('boleto')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('status')
  getStatus(): boolean {
    return true;
  }

  @Get(':code')
  getInformations(@Param('code', ValidationCode) code: string): TicketResponse {
    try {
    } catch (error) {
      throw new HttpException(
        'contact our team for more information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.ticketService.getInformations(code);
  }
}
