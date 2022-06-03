import { GetterTree } from 'vuex';

import IApplicationCar from '@/interfaces/IApplicationCar';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IApplicationCar[] {
    return state.items;
  },
  item(state): IApplicationCar {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
