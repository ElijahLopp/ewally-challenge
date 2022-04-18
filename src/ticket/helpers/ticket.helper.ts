import { Injectable } from '@nestjs/common';
import {
  TicketValues,
  ConcessionaryValues,
} from '../interfaces/ticket.interface';

@Injectable()
export class TicketHelper {
  getBarCodeValues(code: string): TicketValues {
    const freeFields = this.removeTicketFieldIdentifier(code);

    return {
      bankCode: code.substring(3, 0),
      coinCode: code.substring(3, 4),
      freeField: freeFields.join(''),
      verificationCode: code.substring(32, 33),
      ticketValue: code.substring(code.length - 10),
      dueDateFactor: code.substring(33, 37),
    };
  }

  formatTicketDate(code: number): string {
    const baseDate = new Date('2000-07-03');
    const currentDate = new Date();
    const day = 864e5;
    const intervalDate = 8999;

    const days = Math.floor((currentDate.getTime() - baseDate.getTime()) / day);

    const factor = days / intervalDate;

    const factorMultiplier =
      factor > 0.959 && code < 1366 ? Math.ceil(factor) : Math.floor(factor);

    const result = new Date(
      baseDate.getTime() +
        intervalDate * factorMultiplier * day +
        day * (code - 1000),
    )
      .toISOString()
      .split('T')[0];

    return result;
  }

  mountTicketBarCode(barCodeValues: TicketValues): string {
    const {
      bankCode,
      coinCode,
      verificationCode,
      dueDateFactor,
      ticketValue,
      freeField,
    } = barCodeValues;

    return `${bankCode}${coinCode}${verificationCode}${dueDateFactor}${ticketValue}${freeField}`;
  }

  removeTicketFieldIdentifier(code: string): string[] {
    const [firstField] = code.match(/^\d{10}/);
    const [secondField] = code.match(/(?<=^\d{10})\d{11}/);
    const [thirdField] = code.match(/(?<=^\d{10}\d{11})\d{11}/);

    //removing the first four elements from the first field because they are assigned to another function
    const freeFields = [firstField.substring(4), secondField, thirdField];

    return freeFields.reduce((freeField: string[], element) => {
      freeField.push(element.slice(0, -1));
      return freeField;
    }, []);
  }

  getConcessionaryValues(code: string): ConcessionaryValues {
    const [firstField, secondField, thirdField, fourthField] =
      code.match(/\d{12}/g);

    const fields = [firstField, secondField, thirdField, fourthField];

    const barCode = fields
      .reduce((freeField: string[], element) => {
        freeField.push(element.slice(0, -1));
        return freeField;
      }, [])
      .join('');

    const value = barCode.substring(4, 15);

    const [segmentIdentification] = barCode.match(/(?<=^\d)\d/);

    const [dueDateFactor] =
      segmentIdentification === '6'
        ? barCode.match(/(?<=^\d{13})\d{8}/)
        : barCode.match(/(?<=^\d{19})\d{8}/);

    return {
      barCode,
      dueDateFactor,
      value,
    };
  }

  formatConcessionaryDate(code: string): string {
    try {
      const [year] = code.match(/^\d{4}/);
      const [month] = code.match(/(?<=^\d{4})\d{2}/);
      const [day] = code.match(/(?<=^\d{6})\d+/);

      const date = `${year}-${month}-${day}`;
      const finalDate = new Date(date).toISOString();

      if (finalDate.startsWith(date)) return date;
      return 'there is no specified date';
    } catch (error) {
      return 'there is no specified date';
    }
  }
}
