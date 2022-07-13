import { GetterTree } from 'vuex';

import IVisitsApplication from '@/interfaces/IVisitsApplication';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IVisitsApplication[] {
    return state.items;
  },
  item(state): IVisitsApplication {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
