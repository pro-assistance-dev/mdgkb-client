import Division from '@/classes/Division';
import IBuilding from '@/interfaces/IBuilding';
import IEntrance from '@/interfaces/IEntrance';
import ClassHelper from '@/services/ClassHelper';

export default class Entrance implements IEntrance {
  id?: string;
  name = '';
  address = '';
  number?: number;
  building?: IBuilding;
  buildingId?: string;
  divisions?: Division[] = [];

  constructor(i?: IEntrance) {
    ClassHelper.BuildClass(this, i);
    this.setName();
  }

  setName(): void {
    if (!this.building) {
      return;
    }
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
