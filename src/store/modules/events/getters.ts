import { GetterTree } from 'vuex';

import Event from '@/classes/Event';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): Event[] {
    return state.items;
  },
};

export default getters;
