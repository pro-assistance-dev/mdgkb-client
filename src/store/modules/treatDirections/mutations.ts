import { MutationTree } from 'vuex';

import TreatDirection from '@/classes/TreatDirection';
import ITreatDirection from '@/interfaces/ITreatDirection';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ITreatDirection[]) {
    state.items = items?.map((a: ITreatDirection) => new TreatDirection(a));
  },
  set(state, item: ITreatDirection) {
    state.item = new TreatDirection(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
