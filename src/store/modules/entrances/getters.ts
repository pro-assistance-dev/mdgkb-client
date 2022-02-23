import { GetterTree } from 'vuex';

import IEntrance from '@/interfaces/buildings/IEntrance';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEntrance[] {
    return state.items;
  },
};

export default getters;
