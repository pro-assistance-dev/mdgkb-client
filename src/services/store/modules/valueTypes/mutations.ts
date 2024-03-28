import { MutationTree } from 'vuex';

import ValueType from '@/services/classes/ValueType';

import State from './index';

const mutations: MutationTree<State> = {
  setAll(state, items: ValueType[]) {
    state.items = items.map((a: ValueType) => new ValueType(a));
  },
  set(state, item: ValueType) {
    state.item = new ValueType(item);
  },
};

export default mutations;
