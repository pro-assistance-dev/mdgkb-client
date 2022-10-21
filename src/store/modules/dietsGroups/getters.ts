import { GetterTree } from 'vuex';

import IDietGroup from '@/interfaces/IDietGroup';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDietGroup[] {
    return state.items;
  },
  item(state): IDietGroup {
    return state.item;
  },
};

export default getters;
