import DishesGroup from '@/classes/DishesGroup';
import IDishSample from '@/interfaces/IDishSample';

export default class DishSample implements IDishSample {
  id?: string;
  name = '';
  price = 0;
  caloric = 0;
  dishesGroupId?: string;
  dishesGroup = new DishesGroup();

  constructor(i?: IDishSample) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.price = i.price;
    this.caloric = i.caloric;
    this.dishesGroupId = i.dishesGroupId;
    if (i.dishesGroup) {
      this.dishesGroup = new DishesGroup(i.dishesGroup);
    }
  }
}
