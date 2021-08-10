import Division from '@/classes/buildings/Division';
import IDivision from '@/interfaces/buildings/IDivision';
import IFloor from '@/interfaces/buildings/IFloor';

export default class Floor implements IFloor {
  id?: string;
  number?: number;
  buildingId?: string = '';
  divisions?: IDivision[] = [];

  constructor(i?: IFloor) {
    if (!i) return;
    this.id = i.id;
    this.number = i.number;
    this.buildingId = i.buildingId;
    if (i.divisions) this.divisions = i.divisions.map((item: IDivision) => new Division(item));
  }
}
