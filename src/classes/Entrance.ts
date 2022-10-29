import Division from '@/classes/Division';
import IBuilding from '@/interfaces/IBuilding';
import IDivision from '@/interfaces/IDivision';
import IEntrance from '@/interfaces/IEntrance';

import Building from './Building';

export default class Entrance implements IEntrance {
  id?: string;
  name = '';
  address = '';
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
    this.setName();
  }

  setName(): void {
    if (!this.building) return;
    this.name = this.building.address + ', вход ' + this.number;
    this.address = this.name;
  }

  getBuildingNumber(): string {
    return String(this.building?.number);
  }

  getEntranceNumber(): string {
    return String(this.number);
  }
}
