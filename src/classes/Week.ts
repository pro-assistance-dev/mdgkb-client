import IDay from '@/interfaces/IDay';
import IWeek from '@/interfaces/IWeek';

export default class Week implements IWeek {
  days: IDay[] = [];
  active = false;
  constructor() {
    return;
  }

  getDays(fullWeek?: boolean) {
    if (!fullWeek) {
      return this.days;
    }
  }
  getSelectedDay(): IDay | undefined {
    return this.days.find((d: IDay) => d.selected);
  }

  dropActive(): void {
    this.active = false;
    const activeDay = this.days.find((w: IDay) => w.active);
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

  getFirstDay(): IDay {
    return this.days[0];
  }

  getLastDay(): IDay {
    return this.days[this.days.length - 1];
  }
}
