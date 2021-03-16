import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { CalendarEvent } from '../shared/models/calendar-event.model';
import { Data } from './data.events';

@Component({
  selector: 'ngx-material-calendar',
  templateUrl: './ngx-material-calendar.component.html',
  styleUrls: ['./ngx-material-calendar.component.scss'],
})
export class NgxMaterialCalendarComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Input() events: CalendarEvent[];

  monthEvents: Map<string, CalendarEvent[]>;

  dates: Date[] = [];
  numWeeks;

  constructor() {
    this.events = Data.Events;
  }

  ngOnInit(): void {
    if (!this.date) {
      this.date = moment().toDate();
    }
    console.log(moment().format('MMMM YYYY'));
    this.dates = this.getMonthDates();
    this.packEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  today(): void {
    this.date = moment().toDate();
    this.dates = this.getMonthDates();
  }

  previousDate(): void {
    this.date = moment(this.date).add(-1, 'month').toDate();
    this.dates = this.getMonthDates();
  }

  nextDate(): void {
    this.date = moment(this.date).add(1, 'month').toDate();
    this.dates = this.getMonthDates();
  }

  isToday(date: Date): boolean {
    const dateString = moment(date).format('DD-MM-YYYY');
    const currentDateString = moment().format('DD-MM-YYYY');
    return dateString === currentDateString;
  }

  isStartOfMonth(date: Date): boolean {
    return moment(date).format('D') === '1';
  }

  isDayInMonth(date: Date): boolean {
    const startOfMonth = moment(this.date).startOf('month');
    const endofMonth = moment(this.date).endOf('month');
    return moment(date).isBetween(startOfMonth, endofMonth, undefined, '[]');
  }

  getNumberOfWeeks(): number {
    return this.dates.length / 7;
  }

  getMonthDates(): Date[] {
    const startOfMonth = moment(this.date).startOf('month');
    const endofMonth = moment(this.date).endOf('month');
    const getPreviousSundayFrom = (date: moment.Moment) => {
      while (date.format('dddd') !== 'Sunday') {
        date.add(-1, 'day');
      }
      return date;
    };
    const getNextSaturdayFrom = (date: moment.Moment) => {
      while (date.format('dddd') !== 'Saturday') {
        date.add(1, 'day');
      }
      return date;
    };
    const start = getPreviousSundayFrom(startOfMonth);
    const end = getNextSaturdayFrom(endofMonth);
    const getDatesBetween = (startDate: moment.Moment, endDate: moment.Moment) => {
      const dates: Date[] = [];
      const currentDate = startDate;
      while (currentDate.isBefore(end)) {
        dates.push(currentDate.toDate());
        currentDate.add(1, 'day');
      }
      return dates;
    };
    return getDatesBetween(start, end);
  }

  packEvents(): void {
    const isEventAllDay = (event: CalendarEvent) => {
      return event.start?.date && event.end?.date;
    };

    const isEventDate = (event: CalendarEvent) => {
      return event.start?.date && event.end?.date;
    };

    const isEventDateTime = (event: CalendarEvent) => {
      return event.start?.dateTime && event.end?.dateTime;
    };

    const doesEventDateSpanMultipleDays = (event: CalendarEvent) => {
      return event.start.date !== event.end.date;
    };

    const doesEventDateTimeSpanMultipleDays = (event: CalendarEvent) => {
      const startDate = moment(event.start.dateTime).format('YYYY-MM-DD');
      const endDate = moment(event.end.dateTime).format('YYYY-MM-DD');
      return startDate !== endDate;
    };

    const doesEventSpanMultipleDays = (event: CalendarEvent) => {
      if (isEventDate(event)) {
        return doesEventDateSpanMultipleDays(event);
      } else if (isEventDateTime(event)) {
        return doesEventDateTimeSpanMultipleDays(event);
      }
    };

    const addEvent = (day: string, event: CalendarEvent) => {
      if (this.monthEvents.has(day)) {
        this.monthEvents.get(day).push(event);
      } else {
        this.monthEvents.set(day, [event]);
      }
    };

    const setEvents = (event: CalendarEvent) => {
      if (isEventDate(event)) {
        if (doesEventDateSpanMultipleDays(event)) {
          const days = moment(event.end.date).diff(event.start.date, 'days');
          for (let i = 0; i <= days; i++) {
            const day = moment(event.start.date).add(i, 'day').format('YYYY-MM-DD');
            addEvent(day, event);
          }
        } else {
          const day = moment(event.start.date).format('YYYY-MM-DD');
          addEvent(day, event);
        }
      } else if (isEventDateTime(event)) {
        if (doesEventDateTimeSpanMultipleDays(event)) {
          const days = moment(event.end.dateTime).diff(event.start.dateTime, 'days');
          for (let i = 0; i <= days; i++) {
            const day = moment(event.start.dateTime).add(i, 'day').format('YYYY-MM-DD');
            addEvent(day, event);
          }
        } else {
          const day = moment(event.start.dateTime).format('YYYY-MM-DD');
          addEvent(day, event);
        }
      }
    };

    this.monthEvents = new Map();
    for (const event of this.events) {
      setEvents(event);
    }
    console.log(this.monthEvents);

    this.monthEvents.forEach((events: CalendarEvent[], date: string) => {
      events.sort((a, b) => {
        // tslint:disable: variable-name
        const a_isEventDate = isEventDate(a);
        const b_isEventDate = isEventDate(b);

        if (a_isEventDate || b_isEventDate) {
          if (a_isEventDate && b_isEventDate) {
            return 0; // alphabetical by summary?
          }
          if (a_isEventDate && !b_isEventDate) {
            return -1;
          }
          if (b_isEventDate && !a_isEventDate) {
            return 1;
          }
        }

        const a_doesEventDateTimeSpanMultipleDays = doesEventDateTimeSpanMultipleDays(a);
        const b_doesEventDateTimeSpanMultipleDays = doesEventDateTimeSpanMultipleDays(b);

        if (a_doesEventDateTimeSpanMultipleDays || b_doesEventDateTimeSpanMultipleDays) {
          if (a_doesEventDateTimeSpanMultipleDays && b_doesEventDateTimeSpanMultipleDays) {
            if (a.start.dateTime === b.start.dateTime) {
              return 0; // alphabetical by summary?
            } else {
              return moment(a.start.dateTime).isBefore(b.start.dateTime) ? -1 : 1;
            }
          }
          if (a_doesEventDateTimeSpanMultipleDays && !b_doesEventDateTimeSpanMultipleDays) {
            return -1;
          }
          if (b_doesEventDateTimeSpanMultipleDays && !a_doesEventDateTimeSpanMultipleDays) {
            return 1;
          }
        }
        if (a.start.dateTime === b.start.dateTime) {
          return 0; // alphabetical by summary?
        } else {
          return moment(a.start.dateTime).isBefore(b.start.dateTime) ? -1 : 1;
        }
        // tslint:enable: variable-name
      });
    });

    console.log(this.monthEvents);

    
    this.monthEvents = new Map();
    for (const event of this.events) {
      setEvents(event);
    }
  }
}
