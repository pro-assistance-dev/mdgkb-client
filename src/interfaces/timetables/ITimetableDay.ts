import ITimePeriod from '@/interfaces/ITimePeriod';
import IScheduleItem from '@/interfaces/timetables/IScheduleItem';
import IWeekday from '@/interfaces/timetables/IWeekday';

export default interface ITimetableDay {
  id?: string;
  isWeekend: boolean;
  startTime: string;
  startTimeLimit: string;
  endTime: string;
  endTimeLimit: string;
  breaksExists: boolean;
  weekdayId?: string;
  weekday: IWeekday;
  aroundTheClock: boolean;
  breakPeriods: ITimePeriod[];
  breakPeriodsForDelete: string[];
  scheduleItems: IScheduleItem[];

  getPeriodWithName: () => string;
  getPeriod: () => string;
  getTimetable: () => string;
  isNow: () => boolean;
  getTime: (dateString: string) => string;
  showBreakSwitcher: () => boolean;
  addBreak: () => void;
  removeBreak: (index: number) => void;
}
