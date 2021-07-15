import IBuilding from '@/interfaces/buildings/IBuilding';

export interface State {
  buildings: IBuilding[];
  building?: IBuilding;
}
