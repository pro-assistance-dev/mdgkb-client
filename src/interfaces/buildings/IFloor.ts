import IDivision from '@/interfaces/buildings/IDivision';

export default interface IFloor {
  id?: string;
  number?: number;
  buildingId?: string;
  divisions?: IDivision[];
}
