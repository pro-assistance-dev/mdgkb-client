import Diet from '@/classes/Diet';

export default class DietGroup {
  id?: string;
  name = '';
  diets: Diet[] = [];

  constructor(i?: DietGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.diets) {
      this.diets = i.diets.map((item: Diet) => new Diet(item));
    }
  }
}
