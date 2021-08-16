import Division from '@/classes/buildings/Division';
import IDivision from '@/interfaces/buildings/IDivision';
import IEntrance from '@/interfaces/buildings/IEntrance';

export default class Entrance implements IEntrance {
  id?: string;
  number?: number;
  buildingId?: string = '';
  divisions?: IDivision[] = [];

  constructor(i?: IEntrance) {
    if (!i) return;
    this.id = i.id;
    this.number = i.number;
    this.buildingId = i.buildingId;
    if (i.divisions) this.divisions = i.divisions.map((item: IDivision) => new Division(item));
  }
}
