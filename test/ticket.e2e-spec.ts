import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TicketModule } from '../src/ticket/ticket.module';

const RESPONSE_MOCK = () => ({
  goodResponse: {
    barCode: '21299758700000020000001121100012100447561740',
    amount: '20.00',
    expirationDate: '2018-07-16',
  },
  badResponseNumOnly: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'the line is typed is not within the expected pattern',
    error: 'Bad Request',
  },
  badReponseChar: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'only numbers on the line',
    error: 'Bad Request',
  },
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TicketModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/boleto/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/boleto/21290001192110001210904475617405975870000002000')
      .expect(HttpStatus.OK)
      .expect(RESPONSE_MOCK().goodResponse);
  });

  it('/boleto/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/boleto/21290001192110001210904475617405975870000002000e')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(RESPONSE_MOCK().badReponseChar);
  });

  it('/boleto/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/boleto/2129000119211000121090447561740597587000000200')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(RESPONSE_MOCK().badResponseNumOnly);
  });

  it('/boleto/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/boleto/2129000119211000121090447561740597587000000200778')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(RESPONSE_MOCK().badResponseNumOnly);
  });
});
