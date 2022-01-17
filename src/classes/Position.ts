import IPosition from '@/interfaces/IPosition';

export default class Position implements IPosition {
  id?: string;
  name = '';
  order = 0;
  show = true;
  constructor(i?: IPosition) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.show = i.show;
  }
}
