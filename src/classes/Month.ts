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

  constructor(d?: Date) {
    const now = d ? new Date(d) : new Date();
    if (!d) {
      this.active = true;
    }
    const date = new Date(now.getFullYear(), now.getMonth(), 1);
    this.weeks.push(new Week());
    while (date.getMonth() === now.getMonth()) {
      // monthDates.value.push(new Date(date));
      if (date.getDay() === 1 || this.weeks.length === 0) {
        this.weeks.push(new Week());
      }
      const day = new Day();
      day.date = new Date(date);
      this.weeks[this.weeks.length - 1].days.push(day);
      if (date.getDate() === now.getDate()) {
        day.selected = true;
        this.weeks[this.weeks.length - 1].active = true;
      }
      date.setDate(date.getDate() + 1);
    }
    this.setActiveBorder();
  }

  static Init(): Month {
    return new Month();
  }

  static InitFilled(d: Date): IMonth {
    const month = Month.Init();
    const now = new Date(d);
    if (!d) {
      month.active = true;
    }
    const date = new Date(now.getFullYear(), now.getMonth(), 1);
    month.weeks.push(new Week());
    while (date.getMonth() === now.getMonth()) {
      // monthDates.value.push(new Date(date));
      if (date.getDay() === 1 || month.weeks.length === 0) {
        month.weeks.push(new Week());
      }
      const day = new Day();
      day.date = new Date(date);
      month.weeks[month.weeks.length - 1].days.push(day);
      if (date.getDate() === now.getDate()) {
        day.selected = true;
        month.weeks[month.weeks.length - 1].active = true;
      }
      date.setDate(date.getDate() + 1);
    }
    month.setActiveBorder();
    return month;
  }

  getActiveWeek(): IWeek {
    const week = this.weeks.find((w: IWeek) => w.active);
    return week ?? new Week();
  }

  getSelectedDay(): IDay {
    let selectedDay: IDay = new Day();
    this.weeks.some((w: IWeek) => {
      const d = w.days.find((d: IDay) => d.selected === true);
      if (d) {
        selectedDay = d;
        return true;
      }
    });
    return selectedDay;
  }

  moveActiveWeek(toForward: boolean): void {
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
  private setActiveBorder(): void {
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
}
