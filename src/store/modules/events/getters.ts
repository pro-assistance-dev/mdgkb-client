import { GetterTree } from 'vuex';

import IEvent from '@/interfaces/news/IEvent';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEvent[] {
    return state.items;
  },
};

export default getters;
