import Division from '@/classes/buildings/Division';
import IBuilding from '@/interfaces/buildings/IBuilding';
import IDivision from '@/interfaces/buildings/IDivision';
import IEntrance from '@/interfaces/buildings/IEntrance';

import Building from './Building';

export default class Entrance implements IEntrance {
  id?: string;
  number?: number;
  building?: IBuilding;
  buildingId?: string;
  divisions?: IDivision[] = [];

  constructor(entrance?: IEntrance) {
    if (!entrance) {
      return;
    }
    this.id = entrance.id;
    this.number = entrance.number;
    if (entrance.building) this.building = new Building(entrance.building);
    if (entrance.buildingId) this.buildingId = entrance.buildingId;
    if (entrance.divisions) this.divisions = entrance.divisions.map((item: IDivision) => new Division(item));
  }
}
