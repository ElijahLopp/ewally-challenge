import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TicketHelper } from './helpers/ticket.helper';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketMiddleware } from './middlewares/ticket.middleware';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [TicketService, TicketHelper],
})
export class TicketModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TicketMiddleware).forRoutes('*');
  }
}
