import Day from '@/classes/Day';
import Year from '@/classes/Year';
import { CalendarScale } from '@/interfaces/CalendarScale';
import ICalendar from '@/interfaces/ICalendar';
import IDay from '@/interfaces/IDay';
import IMonth from '@/interfaces/IMonth';
import IWeek from '@/interfaces/IWeek';
import IYear from '@/interfaces/IYear';

export default class Calendar implements ICalendar {
  years: IYear[] = [];
  scale: CalendarScale = CalendarScale.Week;

  static Init(): ICalendar {
    return new Calendar();
  }

  static InitFull(): ICalendar {
    const calendar = Calendar.Init();
    for (let i = 2022; i < 2024; i++) {
      calendar.years.push(Year.InitFull(i));
    }
    calendar.initActive();
    return calendar;
  }

  initActive(): void {
    const now = new Date();
    const activeYear = this.years.find((i: IYear) => i.number === now.getFullYear());
    if (!activeYear) {
      return;
    }
    activeYear.active = true;
    const activeMonth = activeYear.months.find((i: IMonth) => i.number === now.getMonth());
    if (!activeMonth) {
      return;
    }
    activeMonth.active = true;
    const activeWeek = activeMonth.weeks.find((i: IWeek) => i.days.some((d: IDay) => d.date.getDate() === now.getDate()));
    if (!activeWeek) {
      return;
    }
    activeWeek.active = true;
    activeMonth.setActiveBorder();
  }

  getActiveYear(): IYear {
    const year = this.years.find((i: IYear) => i.active);
    return year ?? new Year();
  }

  getActivePeriod(): IDay[] {
    if (this.scale === CalendarScale.Week) {
      const y = this.getActiveYear();
      const mi = y.months.findIndex((m: IMonth) => m.active);
      const m = y.months[mi];
      const days = m.getActiveWeek().days;
      if (days.length === 7) {
        return days;
      }
      const lostDays = 7 - days.length;
      if (m.lastWeekActive) {
        const d = y.months[mi + 1].weeks[0].days.slice(0, lostDays);
        return days.concat(d);
      }
      if (m.firstWeekActive) {
        const d = y.months[mi - 1].weeks[y.months[mi - 1].weeks.length - 1].days.slice(0, lostDays);
        return d.concat(days);
      }
    }
    return [];
  }

  move(toForward: boolean): void {
    if (this.scale === CalendarScale.Week) {
      this.getActiveYear().move(toForward);
    }
  }

  getToday(): IDay {
    const now = new Date();
    const year = this.years.find((i: IYear) => i.number === now.getFullYear());
    if (!year) {
      return new Day();
    }
    const month = year.months.find((i: IMonth) => i.number === now.getMonth());
    if (!month) {
      return new Day();
    }
    const week = month.weeks.find((i: IWeek) => i.days.some((d: IDay) => d.date.getDate() === now.getDate()));
    if (!week) {
      return new Day();
    }
    const day = week.days.find((i: IDay) => i.date.getDate() === now.getDate());
    return day ?? new Day();
  }

  getSelectedDay(): IDay {
    let selectedDay = new Day();
    this.years.some((y: IYear) => {
      const day = y.getSelectedDay();
      if (day) {
        selectedDay = day;
        return true;
      }
    });
    return selectedDay;
  }

  selectDay(day: IDay): void {
    const previousSelectedDay = this.getSelectedDay();
    previousSelectedDay.selected = false;
    day.selected = true;
  }
}
