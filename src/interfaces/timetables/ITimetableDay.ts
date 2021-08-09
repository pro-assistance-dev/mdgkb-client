import IWeekday from '@/interfaces/timetables/IWeekday';

export default interface ITimetableDay {
  id?: string;
  startTime: Date;
  endTime: Date;
  breakExist: boolean;
  breakStartTime: Date;
  breakEndTime: Date;
  weekdayId?: string;
  weekday: IWeekday;
}
