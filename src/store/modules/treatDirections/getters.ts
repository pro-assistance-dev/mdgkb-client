import { GetterTree } from 'vuex';

import ITreatDirection from '@/interfaces/ITreatDirection';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ITreatDirection[] {
    return state.items;
  },
  item(state): ITreatDirection {
    return state.item;
  },
};

export default getters;
