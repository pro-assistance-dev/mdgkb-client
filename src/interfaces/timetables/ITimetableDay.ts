import IWeekday from '@/interfaces/timetables/IWeekday';

export default interface ITimetableDay {
  id?: string;
  isWeekend: boolean;
  startTime: string;
  endTime: string;
  breakExist: boolean;
  breakStartTime?: string;
  breakEndTime?: string;
  weekdayId?: string;
  weekday: IWeekday;
  customName: string;
  isCustom: boolean;

  getTime: (date: string) => string;
}
