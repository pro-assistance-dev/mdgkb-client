import IDivision from '@/interfaces/buildings/IDivision';

export default interface IEntrance {
  id?: string;
  number?: number;
  buildingId?: string;
  divisions?: IDivision[];
}
