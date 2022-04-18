import { Injectable } from '@nestjs/common';
import { TicketHelper } from './helpers/ticket.helper';
import { TicketResponse } from './interfaces/ticket.interface';

enum CodeType {
  Concessionary = 48,
  Ticket = 47,
}

@Injectable()
export class TicketService {
  constructor(private readonly ticketHelper: TicketHelper) {}

  getInformations(code: string): TicketResponse {
    const codeType = CodeType[code.length];

    switch (codeType) {
      case 'Ticket':
        return this.getTicket(code);
      case 'Concessionary':
        return this.getConcessionary(code);
    }
  }

  getTicket(code: string): TicketResponse {
    const barCodeValues = this.ticketHelper.getBarCodeValues(code);

    return {
      barCode: this.ticketHelper.mountTicketBarCode(barCodeValues),
      amount: (parseInt(barCodeValues.ticketValue, 10) / 100).toFixed(2),
      expirationDate: this.ticketHelper.formatTicketDate(
        parseInt(barCodeValues.dueDateFactor),
      ),
    };
  }

  getConcessionary(code): TicketResponse {
    const concessionaryValues = this.ticketHelper.getConcessionaryValues(code);

    return {
      barCode: concessionaryValues.barCode,
      amount: (parseInt(concessionaryValues.value, 10) / 100).toFixed(2),
      expirationDate: this.ticketHelper.formatConcessionaryDate(
        concessionaryValues.dueDateFactor,
      ),
    };
  }
}
