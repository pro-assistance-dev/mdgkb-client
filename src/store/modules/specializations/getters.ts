import { GetterTree } from 'vuex';

import ISpecialization from '@/interfaces/ISpecialization';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ISpecialization[] {
    return state.items;
  },
  item(state): ISpecialization {
    return state.item;
  },
};

export default getters;
