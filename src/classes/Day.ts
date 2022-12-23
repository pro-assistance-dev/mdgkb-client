import ICalendarEvent from '@/interfaces/ICalendarEvent';
import IDay from '@/interfaces/IDay';

export default class Day implements IDay {
  date: Date = new Date();
  shortName = '';
  selected = false;
  active = false;
  events: ICalendarEvent[] = [];

  constructor() {
    return;
  }

  isWeekend(): boolean {
    const d = this.date.getDay();
    return d === 6 || d === 0;
  }

  eventsExists(): boolean {
    return this.events.length > 0;
  }
}
