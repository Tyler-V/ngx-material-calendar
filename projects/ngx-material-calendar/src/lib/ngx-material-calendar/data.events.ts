import * as moment from 'moment';
import { CalendarEvent } from '../shared/models/calendar-event.model';

export class Data {
  public static DATETIME_SINGLE_DAY: CalendarEvent[] = [
    {
      created: new Date(),
      updated: new Date(),
      summary: 'Company Meeting',
      description: 'Discuss recent changes in Company',
      start: {
        dateTime: moment('2020-07-08').set('hours', 17).toDate(),
      },
      end: {
        dateTime: moment('2020-07-08').set('hours', 17).add(30, 'minutes').toDate(),
      },
    },
    {
      created: new Date(),
      updated: new Date(),
      summary: 'WellFinder Standup',
      description: '1. What did you work on yesterday?\n2. What are you working on today?\n3. What are your roadblocks?',
      start: {
        dateTime: moment('2020-07-08').set('hours', 9).toDate(),
      },
      end: {
        dateTime: moment('2020-07-08').set('hours', 9).add(30, 'minutes').toDate(),
      },
    },
    {
      created: new Date(),
      updated: new Date(),
      summary: 'UTM RPM Migration Meeting',
      description: 'Meeting to discuss the migration plan.',
      start: {
        dateTime: moment('2020-07-07').set('hours', 10).toDate(),
      },
      end: {
        dateTime: moment('2020-07-07').set('hours', 10).add(60, 'minutes').toDate(),
      },
    },
  ];

  public static DATETIME_MULTIPLE_DAY: CalendarEvent[] = [
    {
      created: new Date(),
      updated: new Date(),
      summary: 'Out of office - Remote Work',
      description: 'I am waiting for an important package that requires signature.',
      start: {
        dateTime: moment('2020-07-07').set('hours', 12).toDate(),
      },
      end: {
        dateTime: moment('2020-07-08').set('hours', 12).toDate(),
      },
    },
  ];

  public static DATE_MULTIPLE_DAY: CalendarEvent[] = [
    {
      created: new Date(),
      updated: new Date(),
      summary: 'Developer Workshop',
      description: 'Teamwork makes the dream work!',
      start: {
        date: moment('2020-07-07').format('YYYY-MM-DD'),
      },
      end: {
        date: moment('2020-07-09').format('YYYY-MM-DD'),
      },
    },
  ];

  public static Events = Data.DATETIME_SINGLE_DAY.concat(Data.DATETIME_MULTIPLE_DAY).concat(Data.DATE_MULTIPLE_DAY);
}
