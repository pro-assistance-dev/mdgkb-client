import Division from '@/classes/Division';

import IBuilding from './IBuilding';

export default interface IEntrance {
  id?: string;
  // Name and address used only on map
  name?: string;
  address?: string;
  number?: number;
  building?: IBuilding;
  buildingId?: string;
  divisions?: Division[];
  setName?: () => void;

  getBuildingNumber: () => string;
  getEntranceNumber: () => string;
}
