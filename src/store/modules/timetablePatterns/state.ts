import ITimetable from '@/interfaces/timetables/ITimetable';

export interface State {
  items: ITimetable[];
  item: ITimetable;
}
