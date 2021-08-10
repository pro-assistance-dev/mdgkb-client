import { GetterTree } from 'vuex';

import IBuilding from '@/interfaces/buildings/IBuilding';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  buildings(state): IBuilding[] | undefined {
    return state.buildings;
  },
  building(state): IBuilding | undefined {
    return state.building;
  },
};

export default getters;
