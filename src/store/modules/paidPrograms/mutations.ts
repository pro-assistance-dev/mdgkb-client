import { MutationTree } from 'vuex';

import PaidProgram from '@/classes/PaidProgram';
import IPaidProgram from '@/interfaces/IPaidProgram';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPaidProgram[]) {
    state.items = items?.map((a: IPaidProgram) => new PaidProgram(a));
  },
  set(state, item?: IPaidProgram) {
    if (item) {
      state.item = new PaidProgram(item);
    } else {
      state.item = new PaidProgram();
    }
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id) {
    const index = state.items.findIndex((i: IPaidProgram) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
