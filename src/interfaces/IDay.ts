import ICalendarEvent from '@/interfaces/ICalendarEvent';

export default interface IDay {
  date: Date;
  shortName: string;
  selected: boolean;
  isWeekend: () => boolean;
  active: boolean;
  events: ICalendarEvent[];
  eventsExists: () => boolean;
}
