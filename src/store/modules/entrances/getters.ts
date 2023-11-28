import { GetterTree } from 'vuex';

import Entrance from '@/classes/Entrance';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): Entrance[] {
    return state.items;
  },
};

export default getters;
