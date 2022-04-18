import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isNumber } from 'class-validator';

@Injectable()
export class ValidationCode implements PipeTransform {
  transform(value: string) {
    const numericValue = Number(value);
    if (!isNumber(numericValue)) {
      throw new BadRequestException('only numbers on the line');
    }
    return value;
  }
}
