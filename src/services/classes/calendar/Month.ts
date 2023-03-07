import Day from '@/services/classes/calendar/Day';
import Week from '@/services/classes/calendar/Week';

export default class Month {
  weeks: Week[] = [];
  firstWeekActive = false;
  lastWeekActive = false;
  active = false;
  number = 0;
  constructor(d?: Date) {
    // const now = d ? new Date(d) : new Date();
    // if (!d) {
    //   this.active = true;
    // }
    // const date = new Date(now.getFullYear(), now.getMonth(), 1);
    // this.weeks.push(new Week());
    // while (date.getMonth() === now.getMonth()) {
    //   // monthDates.value.push(new Date(date));
    //   if (date.getDay() === 1 || this.weeks.length === 0) {
    //     this.weeks.push(new Week());
    //   }
    //   const day = new Day();
    //   day.date = new Date(date);
    //   this.weeks[this.weeks.length - 1].days.push(day);
    //   if (date.getDate() === now.getDate()) {
    //     day.selected = true;
    //     this.weeks[this.weeks.length - 1].active = true;
    //   }
    //   date.setDate(date.getDate() + 1);
    // }
    // this.setActiveBorder();
  }

  static Init(): Month {
    return new Month();
  }

  static InitFull(yearN: number, monthN: number): Month {
    const month = Month.Init();
    month.number = monthN;
    const firstDay = new Date(yearN, monthN, 1);
    const date = new Date(firstDay);
    while (date.getMonth() === firstDay.getMonth()) {
      if (date.getDay() === 1 || month.weeks.length === 0) {
        month.weeks.push(new Week());
      }
      const day = new Day();
      day.date = new Date(date);
      month.weeks[month.weeks.length - 1].days.push(day);
      date.setDate(date.getDate() + 1);
    }
    return month;
  }

  getActiveWeek(): Week {
    const week = this.weeks.find((w: Week) => w.active);
    return week ?? new Week();
  }

  getActiveWeekIndex(): number {
    return this.weeks.findIndex((w: Week) => w.active);
  }

  getSelectedDay(): Day | undefined {
    let selectedDay: Day | undefined = undefined;
    this.weeks.some((w: Week) => {
      const d = w.getSelectedDay();
      if (d) {
        selectedDay = d;
        return true;
      }
    });
    return selectedDay;
  }

  move(toForward: boolean): void {
    const activeWeekIndex = this.weeks.findIndex((w: Week) => w.active);
    if (activeWeekIndex === -1) {
      return;
    }
    this.weeks[activeWeekIndex].active = false;
    if (toForward && this.weeks[activeWeekIndex + 1]) {
      this.weeks[activeWeekIndex + 1].active = true;
    } else if (!toForward && this.weeks[activeWeekIndex - 1]) {
      this.weeks[activeWeekIndex - 1].active = true;
    }
    this.setActiveBorder();
  }
  setActiveBorder(): void {
    const activeWeekIndex = this.weeks.findIndex((w: Week) => w.active);
    if (activeWeekIndex === 0) {
      this.firstWeekActive = true;
      this.lastWeekActive = false;
    } else if (activeWeekIndex === this.weeks.length - 1) {
      this.lastWeekActive = true;
      this.firstWeekActive = false;
    } else {
      this.lastWeekActive = false;
      this.firstWeekActive = false;
    }
  }

  isLast(): boolean {
    return this.number === 11;
  }

  isFirst(): boolean {
    return this.number === 0;
  }

  dropActive(): void {
    const activeWeek = this.weeks.find((w: Week) => w.active);
    this.active = false;
    this.firstWeekActive = false;
    this.lastWeekActive = false;
    if (activeWeek) {
      activeWeek.dropActive();
    }
  }

  initActive(fromStart: boolean): void {
    this.active = true;
    if (fromStart) {
      this.firstWeekActive = true;
      let week = this.getFirstWeek();
      if (week.days.length < 7 && week.days[0].date.getDate() === 1) {
        week = this.weeks[1];
      }
      week.initActive(fromStart);
    }
    if (!fromStart) {
      this.lastWeekActive = true;
      this.getLastWeek().initActive(fromStart);
    }
  }

  getFirstWeek(): Week {
    return this.weeks[0];
  }

  getLastWeek(): Week {
    return this.weeks[this.weeks.length - 1];
  }
}
