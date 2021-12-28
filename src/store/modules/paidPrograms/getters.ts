import { GetterTree } from 'vuex';

import IPaidProgram from '@/interfaces/IPaidProgram';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPaidProgram[] {
    return state.items;
  },
  item(state): IPaidProgram {
    return state.item;
  },
};

export default getters;
