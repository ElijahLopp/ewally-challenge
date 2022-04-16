import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe('TicketController', () => {
  let appController: TicketController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService],
    }).compile();

    appController = app.get<TicketController>(TicketController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello(3)).toBe('Hello World!');
    });
  });
});
