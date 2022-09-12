import { GetterTree } from 'vuex';

import IDiet from '@/interfaces/IDiet';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDiet[] {
    return state.items;
  },
  item(state): IDiet {
    return state.item;
  },
};

export default getters;
