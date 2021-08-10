import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import TimetableDay from '@/classes/timetable/TimetableDay';

export default class Timetable implements ITimetable {
  id?: string;
  timetableDays: ITimetableDay[] = [];

  constructor(i?: ITimetable) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.timetableDays) this.timetableDays = i.timetableDays.map((item: ITimetableDay) => new TimetableDay(item));
  }
}
