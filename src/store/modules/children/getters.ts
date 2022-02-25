import { GetterTree } from 'vuex';

import IChild from '@/interfaces/IChild';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IChild[] {
    return state.items;
  },
  item(state): IChild {
    return state.item;
  },
};

export default getters;
