import { GetterTree } from 'vuex';

import IRole from '@/interfaces/IRole';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IRole[] {
    return state.items;
  },
  item(state): IRole {
    return state.item;
  },
};

export default getters;
