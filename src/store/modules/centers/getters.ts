import { GetterTree } from 'vuex';

import ICenter from '@/interfaces/ICenter';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state, rootState): ICenter[] {
    return state.items;
  },
  item(state): ICenter {
    return state.item;
  },
};

export default getters;
