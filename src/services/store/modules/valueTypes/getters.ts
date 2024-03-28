import { GetterTree } from 'vuex';

import ValueType from '@/services/classes/ValueType';
import RootState from '@/services/interfaces/types';

import State from './index';

const getters: GetterTree<State, RootState> = {
  items(state): ValueType[] {
    return state.items;
  },
  item(state): ValueType {
    return state.item;
  },
};
export default getters;
