import Diet from '@/classes/Diet';
import IDiet from '@/interfaces/IDiet';
import IDietGroup from '@/interfaces/IDietGroup';

export default class DietGroup implements IDietGroup {
  id?: string;
  name = '';
  diets: IDiet[] = [];

  constructor(i?: IDietGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.diets) {
      this.diets = i.diets.map((item: IDiet) => new Diet(item));
    }
  }
}
