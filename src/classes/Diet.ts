import DietAge from '@/classes/DietAge';
import DietGroup from '@/classes/DietGroup';
import Timetable from '@/classes/Timetable';
import ClassHelper from '@/services/ClassHelper';

export default class Diet {
  id?: string;
  name = '';
  shortName = '';
  siteName = '';
  diabetes = false;

  motherDiet?: Diet;
  motherDietId?: string;

  @ClassHelper.GetClassConstructor(DietAge)
  dietAges: DietAge[] = [];
  dietGroupId?: string;
  @ClassHelper.GetClassConstructor(DietGroup)
  dietGroup: DietGroup = new DietGroup();

  constructor(i?: Diet) {
    ClassHelper.BuildClass(this, i);
  }

  getMotherTimetable(): Timetable | undefined {
    return this.motherDiet?.dietAges[0]?.timetable;
  }
}
