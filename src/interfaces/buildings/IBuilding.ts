import IEntrance from '@/interfaces/buildings/IEntrance';
import IFloor from '@/interfaces/buildings/IFloor';

export default interface IBuilding {
  id: string;
  address: string;
  number: string;
  name: string;
  status: string;
  description: string;
  floors: IFloor[];
  entrances: IEntrance[];
}
