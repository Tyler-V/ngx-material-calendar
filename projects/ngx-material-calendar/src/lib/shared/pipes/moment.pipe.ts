import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
  constructor() {}

  transform(value: Date, format?: string, ...args: any[]): string {
    if (!value) {
      return '';
    }
    return moment(value).format(format);
  }
}
