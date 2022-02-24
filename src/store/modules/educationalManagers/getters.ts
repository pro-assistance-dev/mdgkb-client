import { GetterTree } from 'vuex';

import IEducationalManager from '@/interfaces/IEducationalManager';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEducationalManager[] {
    return state.items;
  },
  item(state): IEducationalManager {
    return state.item;
  },
};

export default getters;
