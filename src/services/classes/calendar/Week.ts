import Day from '@/services/classes/calendar/Day';

export default class Week {
  days: Day[] = [];
  active = false;
  constructor() {
    return;
  }

  getDays(fullWeek?: boolean) {
    if (!fullWeek) {
      return this.days;
    }
  }
  getSelectedDay(): Day | undefined {
    return this.days.find((d: Day) => d.selected);
  }

  dropActive(): void {
    this.active = false;
    const activeDay = this.days.find((w: Day) => w.active);
    if (activeDay) {
      activeDay.active = false;
    }
  }

  initActive(fromStart: boolean): void {
    this.active = true;
    if (fromStart) {
      this.getFirstDay().active = true;
    }
    if (fromStart) {
      this.getLastDay().active = true;
    }
  }

  getFirstDay(): Day {
    return this.days[0];
  }

  getLastDay(): Day {
    return this.days[this.days.length - 1];
  }
}
