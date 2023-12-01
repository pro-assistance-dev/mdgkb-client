import DietAge from '@/classes/DietAge';
import DietGroup from '@/classes/DietGroup';
import Timetable from '@/classes/Timetable';

export default class Diet {
  id?: string;
  name = '';
  shortName = '';
  siteName = '';
  diabetes = false;

  motherDiet?: Diet;
  motherDietId?: string;

  dietAges: DietAge[] = [];
  dietGroupId?: string;
  dietGroup: DietGroup = new DietGroup();

  constructor(i?: Diet) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.siteName = i.siteName;
    this.diabetes = i.diabetes;
    this.dietGroupId = i.dietGroupId;
    if (i.motherDiet) {
      this.motherDiet = new Diet(i.motherDiet);
    }
    this.motherDietId = i.motherDietId;
    if (i.dietGroup) {
      this.dietGroup = new DietGroup(i.dietGroup);
    }
    if (i.dietAges) {
      this.dietAges = i.dietAges.map((item: DietAge) => new DietAge(item));
    }
  }

  getMotherTimetable(): Timetable | undefined {
    return this.motherDiet?.dietAges[0]?.timetable;
  }
}
