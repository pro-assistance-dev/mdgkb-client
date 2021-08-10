import IBuilding from '@/interfaces/buildings/IBuilding';
import IFloor from '@/interfaces/buildings/IFloor';
import Floor from '@/classes/buildings/Floor';

export default class Building implements IBuilding {
  id = '';
  number = '';
  address = '';
  name = '';
  status = '';
  description = '';
  floors?: IFloor[] = [];

  constructor(i?: IBuilding) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.address = i.address;
    this.number = i.number;
    this.name = i.name;
    this.status = i.status;
    this.description = i.description;
    // TODO Отсортировать на бэке
    if (i.floors)
      this.floors = i.floors
        .map((item: IFloor) => new Floor(item))
        .sort((a: IFloor, b: IFloor) => {
          if (a.number && b.number) {
            return a.number - b.number;
          }
          return 0;
        });
  }
}
