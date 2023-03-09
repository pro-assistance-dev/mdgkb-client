import Day from '@/services/classes/calendar/Day';
import Month from '@/services/classes/calendar/Month';

export default class Year {
  months: Month[] = [];
  number = 0;
  active = false;
  lastMonthActive = false;
  firstMonthActive = false;

  getActiveMonth(): Month {
    const month = this.months.find((m: Month) => m.active);
    return month ?? new Month();
  }

  getActiveMonthIndex(): number {
    return this.months.findIndex((m: Month) => m.active);
  }

  static Init(number?: number): Year {
    const year = new Year();
    year.number = number ?? 0;
    return year;
  }

  static InitFull(yearN?: number): Year {
    const year = Year.Init(yearN);
    for (let i = 0; i < 12; i++) {
      year.months.push(Month.InitFull(year.number, i));
    }
    return year;
  }

  static InitCurrent(): Year {
    const year = Year.Init();
    year.number = new Date().getFullYear();
    year.active = true;
    return year;
  }

  static InitFilled(): Year {
    return Year.Init();
  }

  getFirstDay(): Date {
    return new Date(this.number, 0, 1);
  }

  move(toForward: boolean): void {
    const activeMonth = this.getActiveMonth();
    if ((activeMonth.lastWeekActive && toForward) || (activeMonth.firstWeekActive && !toForward)) {
      this.moveMonth(toForward);
      return;
    }
    activeMonth.move(toForward);
  }

  moveMonth(toForward: boolean): void {
    const activeMonthIndex = this.getActiveMonthIndex();
    if (activeMonthIndex === -1 || activeMonthIndex > 11) {
      this.lastMonthActive = false;
      this.firstMonthActive = false;
      return;
    }
    if (activeMonthIndex === 11) {
      this.lastMonthActive = true;
      this.firstMonthActive = false;
    } else if (activeMonthIndex === 0) {
      this.lastMonthActive = false;
      this.firstMonthActive = true;
    } else {
      this.lastMonthActive = false;
      this.firstMonthActive = false;
    }
    this.months[activeMonthIndex].active = false;
    this.months[activeMonthIndex].getActiveWeek().active = false;
    this.months[activeMonthIndex].firstWeekActive = false;
    this.months[activeMonthIndex].lastWeekActive = false;
    const nextIndex = toForward ? activeMonthIndex + 1 : activeMonthIndex - 1;

    const newActiveMonth = this.months[nextIndex];
    newActiveMonth.active = true;
    const week = newActiveMonth.weeks[toForward ? 0 : newActiveMonth.weeks.length - 1];
    if (week.days.length < 7) {
      newActiveMonth.weeks[toForward ? 1 : newActiveMonth.weeks.length - 2].active = true;
    } else {
      week.active = true;
    }
    newActiveMonth.setActiveBorder();
  }

  getSelectedDay(): Day | undefined {
    let selectedDay = undefined;
    this.months.some((m: Month) => {
      const day = m.getSelectedDay();
      if (day) {
        selectedDay = day;
        return true;
      }
    });
    return selectedDay;
  }

  dropActive(): void {
    this.active = false;
    this.firstMonthActive = false;
    this.lastMonthActive = false;
    this.getActiveMonth().dropActive();
  }

  initActive(fromStart: boolean): void {
    this.active = true;
    if (fromStart) {
      this.firstMonthActive = true;
      this.getFirstMonth().initActive(fromStart);
    }
    if (!fromStart) {
      console.log('getLastMonth');
      this.lastMonthActive = true;
      this.getLastMonth().initActive(fromStart);
    }
  }

  getFirstMonth(): Month {
    return this.months[0];
  }

  getLastMonth(): Month {
    return this.months[11];
  }
}
