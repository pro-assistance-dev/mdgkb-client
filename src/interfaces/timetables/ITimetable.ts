import ITimetableDay from '@/interfaces/timetables/ITimetableDay';

export default interface ITimetable {
  id?: string;
  timetableDays: ITimetableDay[];
}
