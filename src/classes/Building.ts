import Division from '@/classes/Division';
import Entrance from '@/classes/Entrance';
import Floor from '@/classes/Floor';
import IBuilding from '@/interfaces/IBuilding';
import IFloor from '@/interfaces/IFloor';
import ClassHelper from '@/services/ClassHelper';

export default class Building {
  id = '';
  number = '';
  address = '';
  name = '';
  status = '';
  description = '';
  @ClassHelper.GetClassConstructorForArray(Floor)
  floors: Floor[] = [];
  @ClassHelper.GetClassConstructorForArray(Entrance)
  entrances: Entrance[] = [];

  constructor(i?: IBuilding) {
    ClassHelper.BuildClass(this, i);
  }

  getFloorsWithDivisions(): Floor[] {
    return this.floors.filter((f: Floor) => f.divisions && f.divisions.length > 0);
  }

  findDivision(divisionId: string): Division | undefined {
    let indexOfDivision = -1;
    const indexOfFloor = this.floors.findIndex((f: IFloor, floorIndex: number) => {
      const divIndex = f.divisions.findIndex((d: Division) => d.id === divisionId);
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
