import { GetterTree } from 'vuex';

import IValueType from '@/interfaces/IValueType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IValueType[] {
    return state.items;
  },
};

export default getters;
