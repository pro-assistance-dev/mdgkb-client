import IDivision from '@/interfaces/IDivision';

export default interface IFloor {
  id?: string;
  number?: number;
  buildingId?: string;
  divisions: IDivision[];
}
