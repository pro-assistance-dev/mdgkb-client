import { GetterTree } from 'vuex';

import ValueType from '@/services/classes/ValueType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ValueType[] {
    return state.items;
  },
};

export default getters;
