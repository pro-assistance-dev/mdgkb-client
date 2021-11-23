import IWeekday from '@/interfaces/timetables/IWeekday';

export default interface ITimetableDay {
  id?: string;
  isWeekend: boolean;
  startTime: string;
  startTimeLimit: string;
  endTime: string;
  endTimeLimit: string;
  breakExist: boolean;
  breakStartTime?: string;
  breakEndTime?: string;
  weekdayId?: string;
  weekday: IWeekday;
  customName: string;
  isCustom: boolean;

  getPeriodWithName: () => string;
  getPeriod: () => string;
  isNow: () => boolean;
  getTime: (dateString: string) => string;
}
