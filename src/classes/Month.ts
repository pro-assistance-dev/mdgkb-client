import Day from '@/classes/Day';
import Week from '@/classes/Week';
import IDay from '@/interfaces/IDay';
import IMonth from '@/interfaces/IMonth';
import IWeek from '@/interfaces/IWeek';

export default class Month implements IMonth {
  weeks: IWeek[] = [];
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

  static InitFull(yearN: number, monthN: number): IMonth {
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

  getActiveWeek(): IWeek {
    const week = this.weeks.find((w: IWeek) => w.active);
    return week ?? new Week();
  }

  getActiveWeekIndex(): number {
    return this.weeks.findIndex((w: IWeek) => w.active);
  }

  getSelectedDay(): IDay | undefined {
    let selectedDay: IDay | undefined = undefined;
    this.weeks.some((w: IWeek) => {
      const d = w.getSelectedDay();
      if (d) {
        selectedDay = d;
        return true;
      }
    });
    return selectedDay;
  }

  move(toForward: boolean): void {
    // const activeWeek = this.getActiveWeek();
    const activeWeekIndex = this.weeks.findIndex((w: IWeek) => w.active);
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
    const activeWeekIndex = this.weeks.findIndex((w: IWeek) => w.active);
    if (activeWeekIndex === 0) {
      this.firstWeekActive = true;
      this.lastWeekActive = false;
    }
    if (activeWeekIndex === this.weeks.length - 1) {
      this.lastWeekActive = true;
      this.firstWeekActive = false;
    }
  }

  isLast(): boolean {
    return this.number === 11;
  }

  isFirst(): boolean {
    return this.number === 0;
  }
}