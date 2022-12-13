import IDay from '@/interfaces/IDay';

export default class Day implements IDay {
  date: Date = new Date();
  shortName = '';
  selected = false;
  active = false;
  constructor() {
    return;
  }

  isWeekend(): boolean {
    const d = this.date.getDay();
    return d === 6 || d === 0;
  }
}
