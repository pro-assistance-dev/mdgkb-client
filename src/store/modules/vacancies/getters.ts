import { GetterTree } from 'vuex';

import IVacancy from '@/interfaces/IVacancy';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IVacancy[] {
    return state.items;
  },
  item(state): IVacancy {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
