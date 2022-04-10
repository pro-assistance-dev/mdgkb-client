import { GetterTree } from 'vuex';

import IEducationYear from '@/interfaces/IEducationYear';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEducationYear[] {
    return state.items;
  },
  item(state): IEducationYear {
    return state.item;
  },
};

export default getters;
