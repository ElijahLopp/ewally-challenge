import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TicketMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { 0: url } = req.params;

    const params = url.split('/');

    params.forEach((e) => {
      parseInt(e) ? this.validateCode(e) : '';
    });
    next();
  }

  validateCode(code: string) {
    if (code.length < 47 || code.length > 48) {
      throw new BadRequestException(
        'the line is typed is not within the expected pattern',
      );
    }
  }
}
