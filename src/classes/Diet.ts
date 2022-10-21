import DietAge from '@/classes/DietAge';
import DietGroup from '@/classes/DietGroup';
import IDiet from '@/interfaces/IDiet';
import IDietAge from '@/interfaces/IDietAge';
import IDietGroup from '@/interfaces/IDietGroup';

export default class Diet implements IDiet {
  id?: string;
  name = '';
  shortName = '';
  siteName = '';
  diabetes = false;

  // motherDiet: IDiet = new Diet();
  // motherDietId?: string;

  dietAges: IDietAge[] = [];
  dietGroupId?: string;
  dietGroup: IDietGroup = new DietGroup();

  constructor(i?: IDiet) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.siteName = i.siteName;
    this.diabetes = i.diabetes;
    this.dietGroupId = i.dietGroupId;
    if (i.dietGroup) {
      this.dietGroup = new DietGroup(i.dietGroup);
    }
    if (i.dietAges) {
      this.dietAges = i.dietAges.map((item: IDietAge) => new DietAge(item));
    }
  }
}
