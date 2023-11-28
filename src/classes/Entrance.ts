import Building from '@/classes/Building';
import Division from '@/classes/Division';
import ClassHelper from '@/services/ClassHelper';

export default class Entrance {
  id?: string;
  name = '';
  address = '';
  number?: number;
  building?: Building;
  buildingId?: string;
  divisions?: Division[] = [];

  constructor(i?: Entrance) {
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
