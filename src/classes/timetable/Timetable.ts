import TimetableDay from '@/classes/timetable/TimetableDay';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';

export default class Timetable implements ITimetable {
  id?: string;
  timetableDays: ITimetableDay[] = [];

  constructor(i?: ITimetable) {
    if (!i) return;
    this.id = i.id;
    if (i.timetableDays) this.timetableDays = i.timetableDays.map((item: ITimetableDay) => new TimetableDay(item));
  }
  static CreateStandartTimetable(weekdays: IWeekday[]): Timetable {
    const timetable = new Timetable();
    timetable.timetableDays = TimetableDay.CreateStandartWeek(weekdays);
    return timetable;
  }
}
