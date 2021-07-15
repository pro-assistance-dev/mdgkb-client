import { MutationTree } from 'vuex';

import { State } from './state';
import IBuilding from '@/interfaces/buildings/IBuilding';
import Building from '@/classes/buildings/Building';

const mutations: MutationTree<State> = {
  setAll(state, buildings: IBuilding[]) {
    state.buildings = buildings.map((i: IBuilding) => new Building(i));
  },
  set(state, building: IBuilding) {
    state.building = new Building(building);
  },
};

export default mutations;
