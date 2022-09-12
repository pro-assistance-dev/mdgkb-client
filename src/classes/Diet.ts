import AgePeriod from '@/classes/AgePeriod';
import Timetable from '@/classes/timetable/Timetable';
import IAgePeriod from '@/interfaces/IAgePeriod';
import IDiet from '@/interfaces/IDiet';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default class Diet implements IDiet {
  id?: string;
  name = '';
  shortName = '';
  siteName = '';
  diabetes = false;

  // motherDiet: IDiet = new Diet();
  // motherDietId?: string;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  agePeriod: IAgePeriod = new AgePeriod();
  agePeriodId?: string;

  constructor(i?: IDiet) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.siteName = i.siteName;
    this.diabetes = i.diabetes;
    // this.motherDietId = i.motherDietId;
    // if (i.motherDiet) {
    //   this.motherDiet = new Diet(i.motherDiet);
    // }
    this.timetableId = i.timetableId;
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.agePeriodId = i.agePeriodId;
    if (i.agePeriod) {
      this.agePeriod = new AgePeriod(i.agePeriod);
    }
  }
}
