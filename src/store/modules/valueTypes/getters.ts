import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import ValueType from '@/services/classes/ValueType';

const getters: GetterTree<State, RootState> = {
  items(state): ValueType[] {
    return state.items;
  },
};

export default getters;
