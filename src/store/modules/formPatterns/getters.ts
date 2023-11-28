import { GetterTree } from 'vuex';

import Form from '@/classes/Form';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): Form[] {
    return state.items;
  },
  item(state): Form {
    return state.item;
  },
};

export default getters;
