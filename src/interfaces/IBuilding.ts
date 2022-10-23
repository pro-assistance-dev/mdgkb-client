import IDivision from '@/interfaces/IDivision';
import IEntrance from '@/interfaces/IEntrance';
import IFloor from '@/interfaces/IFloor';

export default interface IBuilding {
  id: string;
  address: string;
  number: string;
  name: string;
  status: string;
  description: string;
  floors: IFloor[];
  entrances: IEntrance[];

  getFloorsWithDivisions: () => IFloor[];
  findDivision: (divisionId: string) => IDivision | undefined;
}
