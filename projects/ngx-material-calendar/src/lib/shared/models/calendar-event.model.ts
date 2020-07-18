export interface CalendarEvent {
  id?: string;
  created: Date;
  updated: Date;
  summary: string; // XYZ Project Review
  description: string; // Project XYZ Review Meeting
  location?: string;
  organizer?: {
    id?: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: CalendarEventDateTime;
  end: CalendarEventDateTime;
}

export interface CalendarEventDateTime {
  /** The date, in the format "YYYY-MM-DD", if this is an all-day event. */
  date?: string;
  /**
   * The time, as a combined date-time value (formatted according to RFC3339).
   * A time zone offset is required unless a time zone is explicitly specified in timeZone.
   */
  dateTime?: Date;
  /**
   * The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".)
   * For recurring events this field is required and specifies the time zone in which the recurrence is expanded.
   * For single events this field is optional and indicates a custom time zone for the event start/end.
   */
  timeZoneId?: string;
}
