import IDivision from '@/interfaces/buildings/IDivision';

import IBuilding from './IBuilding';

export default interface IEntrance {
  id?: string;
  // Name and address used only on map
  name?: string;
  address?: string;
  number?: number;
  building?: IBuilding;
  buildingId?: string;
  divisions?: IDivision[];
  setName?: () => void;
}
