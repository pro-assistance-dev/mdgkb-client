import Day from '@/services/classes/calendar/Day';
import Month from '@/services/classes/calendar/Month';
import Week from '@/services/classes/calendar/Week';
import Year from '@/services/classes/calendar/Year';
import { CalendarScale } from '@/services/interfaces/CalendarScale';

export default class Calendar {
  years: Year[] = [];
  scale: CalendarScale = CalendarScale.Week;

  static Init(): Calendar {
    return new Calendar();
  }

  static InitFull(): Calendar {
    const calendar = Calendar.Init();
    for (let i = 2022; i < 2025; i++) {
      calendar.years.push(Year.InitFull(i));
    }
    calendar.initActive();
    return calendar;
  }

  initActive(): void {
    const now = new Date();
    const activeYear = this.years.find((i: Year) => i.number === now.getFullYear());
    if (!activeYear) {
      return;
    }
    activeYear.active = true;
    const activeMonth = activeYear.months.find((i: Month) => i.number === now.getMonth());
    if (!activeMonth) {
      return;
    }
    activeMonth.active = true;
    const activeWeek = activeMonth.weeks.find((i: Week) => i.days.some((d: Day) => d.date.getDate() === now.getDate()));
    if (!activeWeek) {
      return;
    }
    activeWeek.active = true;
    activeMonth.setActiveBorder();
  }

  getActiveYear(): Year {
    const year = this.years.find((i: Year) => i.active);
    return year ?? new Year();
  }

  getActiveYearIndex(): number {
    return this.years.findIndex((i: Year) => i.active);
  }

  getActivePeriod(): Day[] {
    if (this.scale === CalendarScale.Week) {
      const activeYearIndex = this.getActiveYearIndex();
      const mi = this.years[activeYearIndex].months.findIndex((m: Month) => m.active);
      const m = this.years[activeYearIndex].months[mi];
      const days = m.getActiveWeek().days;
      if (days.length === 7) {
        return days;
      }
      const lostDays = 7 - days.length;
      if (m.isLast() && m.lastWeekActive) {
        const d = this.years[activeYearIndex + 1].months[0].weeks[0].days.slice(0, lostDays);
        return days.concat(d);
      }
      if (m.isFirst() && m.firstWeekActive) {
        const d = this.years[activeYearIndex - 1].getLastMonth().getLastWeek().days.slice(0, lostDays);
        return d.concat(days);
      }
      if (m.lastWeekActive) {
        const d = this.years[activeYearIndex].months[mi + 1].weeks[0].days.slice(0, lostDays);
        return days.concat(d);
      }
      if (m.firstWeekActive) {
        const d = this.years[activeYearIndex].months[mi - 1].weeks[this.years[activeYearIndex].months[mi - 1].weeks.length - 1].days.slice(
          0,
          lostDays
        );
        return d.concat(days);
      }
    }
    return [];
  }

  move(toForward: boolean): void {
    if (this.scale === CalendarScale.Week) {
      const previousPeriod = this.getActivePeriod();
      const activeYear = this.getActiveYear();
      const activeMonth = activeYear.getActiveMonth();
      if (toForward && activeMonth.isLast() && activeMonth.lastWeekActive) {
        this.moveYear(toForward);
        const nowPeriod = this.getActivePeriod();
        if (this.periodsIsEqual(previousPeriod, nowPeriod)) {
          this.move(toForward);
        }
        return;
      }
      if (!toForward && activeMonth.isFirst() && activeMonth.firstWeekActive) {
        this.moveYear(toForward);
        const nowPeriod = this.getActivePeriod();
        if (this.periodsIsEqual(previousPeriod, nowPeriod)) {
          this.move(toForward);
        }
        return;
      }
      activeYear.move(toForward);
      const nowPeriod = this.getActivePeriod();
      if (this.periodsIsEqual(previousPeriod, nowPeriod)) {
        this.move(toForward);
      }
    }
  }

  moveYear(toForward: boolean): void {
    const activeIndex = this.getActiveYearIndex();
    if (activeIndex === -1) {
      return;
    }
    this.years[activeIndex].dropActive();
    const newActiveYear = this.years[toForward ? activeIndex + 1 : activeIndex - 1];
    newActiveYear.initActive(toForward);
  }

  getToday(): Day {
    const now = new Date();
    const year = this.years.find((i: Year) => i.number === now.getFullYear());
    if (!year) {
      return new Day();
    }
    const month = year.months.find((i: Month) => i.number === now.getMonth());
    if (!month) {
      return new Day();
    }
    const week = month.weeks.find((i: Week) => i.days.some((d: Day) => d.date.getDate() === now.getDate()));
    if (!week) {
      return new Day();
    }
    const day = week.days.find((i: Day) => i.date.getDate() === now.getDate());
    return day ?? new Day();
  }

  getSelectedDay(): Day {
    let selectedDay = new Day();
    this.years.some((y: Year) => {
      const day = y.getSelectedDay();
      if (day) {
        selectedDay = day;
        return true;
      }
    });
    return selectedDay;
  }

  selectDay(day: Day): void {
    const previousSelectedDay = this.getSelectedDay();
    previousSelectedDay.selected = false;
    day.selected = true;
  }

  periodsIsEqual(activePeriod1: Day[], activePeriod2: Day[]): boolean {
    return activePeriod1.every((day: Day, i: number) => day.date.getDate() === activePeriod2[i].date.getDate());
  }

  getDateWithOffset() {
    return new Date(this.getSelectedDay().date.getTime() - new Date().getTimezoneOffset() * 60000);
  }
}
