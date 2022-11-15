import IDishesGroup from '@/interfaces/IDishesGroup';

export default class DishesGroup implements IDishesGroup {
  id?: string;
  name = '';
  order = 0;

  constructor(i?: IDishesGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
  }
}
