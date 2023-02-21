import CalendarEvent from '@/classes/CalendarEvent';

export default class Day {
  date: Date = new Date();
  shortName = '';
  selected = false;
  active = false;
  events: CalendarEvent[] = [];

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
