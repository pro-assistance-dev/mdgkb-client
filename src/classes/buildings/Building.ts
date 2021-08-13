import Entrance from '@/classes/buildings/Entrance';
import Floor from '@/classes/buildings/Floor';
import IBuilding from '@/interfaces/buildings/IBuilding';
import IEntrance from '@/interfaces/buildings/IEntrance';
import IFloor from '@/interfaces/buildings/IFloor';

export default class Building implements IBuilding {
  id = '';
  number = '';
  address = '';
  name = '';
  status = '';
  description = '';
  floors?: IFloor[] = [];
  entrances?: IEntrance[] = [];

  constructor(i?: IBuilding) {
    if (!i) return;
    this.id = i.id;
    this.address = i.address;
    this.number = i.number;
    this.name = i.name;
    this.status = i.status;
    this.description = i.description;
    if (i.floors) {
      this.floors = i.floors.map((item: IFloor) => new Floor(item));
      // .sort((a: IFloor, b: IFloor) => {
      //   if (a.number && b.number) {
      //     return a.number - b.number;
      //   }
      //   return 0;
      // });
    }
    if (i.entrances) {
      this.entrances = i.entrances.map((item: IEntrance) => new Entrance(item));
      // .sort((a: IEntrance, b: IEntrance) => {
      //   if (a.number && b.number) {
      //     return a.number - b.number;
      //   }
      //   return 0;
      // });
    }
  }
}
