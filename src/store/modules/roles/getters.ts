import { GetterTree } from 'vuex';

import Role from '@/services/classes/Role';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): Role[] {
    return state.items;
  },
  item(state): Role {
    return state.item;
  },
};

export default getters;
