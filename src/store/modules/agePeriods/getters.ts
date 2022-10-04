import { GetterTree } from 'vuex';

import IAgePeriod from '@/interfaces/IAgePeriod';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IAgePeriod[] {
    return state.items;
  },
  item(state): IAgePeriod {
    return state.item;
  },
  selectedItemId(state): string {
    return state.selectedItemId;
  },
};

export default getters;
