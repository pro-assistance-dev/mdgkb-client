import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IDietAge {
  id?: string;
  name: string;
  timetable: ITimetable;
  timetableId?: string;
}
