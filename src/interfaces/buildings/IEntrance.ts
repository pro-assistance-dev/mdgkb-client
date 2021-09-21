import IDivision from '@/interfaces/buildings/IDivision';

import IBuilding from './IBuilding';

export default interface IEntrance {
  id?: string;
  number?: number;
  building?: IBuilding;
  buildingId?: string;
  divisions?: IDivision[];
}
