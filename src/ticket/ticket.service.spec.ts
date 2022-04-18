import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketHelper } from './helpers/ticket.helper';

describe('TicketService', () => {
  let ticketService: TicketService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TicketService, TicketHelper],
    }).compile();

    ticketService = app.get<TicketService>(TicketService);
  });

  describe('service tests', () => {
    it('should return ticket informations', () => {
      expect(
        ticketService.getInformations(
          '21290001192110001210904475617405975870000002000',
        ),
      ).toEqual({
        barCode: '21299758700000020000001121100012100447561740',
        amount: '20.00',
        expirationDate: '2018-07-16',
      });
    });

    it('should return ticket informations', () => {
      expect(
        ticketService.getInformations(
          '846700000017435900240209024050002435842210108119',
        ),
      ).toEqual({
        barCode: '84670000001435900240200240500024384221010811',
        amount: '143.59',
        expirationDate: 'there is no specified date',
      });
    });
  });
});
