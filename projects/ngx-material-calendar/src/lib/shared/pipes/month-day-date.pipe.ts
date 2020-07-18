import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'monthDayDate' })
export class MonthDateDatePipe implements PipeTransform {
  constructor() {}

  transform(value: Date, ...args: any[]): string {
    if (!value) {
      return '';
    }

    const momentDate = moment(value);
    const momentDay = momentDate.format('D');

    if (momentDay === '1') {
      return `${momentDate.format('MMM')} ${momentDay}`;
    }

    return momentDay;
  }
}
