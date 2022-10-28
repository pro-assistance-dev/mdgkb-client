import Entrance from '@/classes/Entrance';
import Floor from '@/classes/Floor';
import IBuilding from '@/interfaces/IBuilding';
import IDivision from '@/interfaces/IDivision';
import IEntrance from '@/interfaces/IEntrance';
import IFloor from '@/interfaces/IFloor';

export default class Building implements IBuilding {
  id = '';
  number = '';
  address = '';
  name = '';
  status = '';
  description = '';
  floors: IFloor[] = [];
  entrances: IEntrance[] = [];

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
      // .sorts((a: IFloor, b: IFloor) => {
      //   if (a.number && b.number) {
      //     return a.number - b.number;
      //   }
      //   return 0;
      // });
    } else {
      this.floors = [new Floor({ number: 1, divisions: [] })];
    }
    if (i.entrances) {
      this.entrances = i.entrances.map((item: IEntrance) => new Entrance(item));
      // .sorts((a: IEntrance, b: IEntrance) => {
      //   if (a.number && b.number) {
      //     return a.number - b.number;
      //   }
      //   return 0;
      // });
    } else {
      const e = new Entrance();
      e.number = 1;
      e.buildingId = i.id;

      this.entrances = [e];
    }
  }
  getFloorsWithDivisions(): IFloor[] {
    return this.floors.filter((f: IFloor) => f.divisions && f.divisions.length > 0);
  }

  findDivision(divisionId: string): IDivision | undefined {
    let indexOfDivision = -1;
    const indexOfFloor = this.floors.findIndex((f: IFloor, floorIndex: number) => {
      const divIndex = f.divisions?.findIndex((d: IDivision) => d.id === divisionId);
      if (divIndex && divIndex > -1) {
        indexOfDivision = divIndex;
        return true;
      }
    });
    if (!indexOfFloor) {
      return undefined;
    }
    return this.floors[indexOfFloor].divisions[indexOfDivision];
  }
}
