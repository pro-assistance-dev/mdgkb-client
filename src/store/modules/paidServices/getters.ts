import { GetterTree } from 'vuex';

import IPaidService from '@/interfaces/IPaidService';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPaidService[] {
    return state.items;
  },
  item(state): IPaidService {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
