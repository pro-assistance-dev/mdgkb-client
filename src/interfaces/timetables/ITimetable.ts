import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

export default interface ITimetable {
  id?: string;
  title?: string;
  timetableDays: ITimetableDay[];
  timetableDaysForDelete: string[];

  getNowDay: () => ITimetableDay;
  isWorkTime: () => boolean;
  isAroundTheClock: () => boolean;
  getOnlyWorkDays: () => string[];
  getTodayTimetable: () => string;
  getTodayWorkday: () => ITimetableDay;
}
