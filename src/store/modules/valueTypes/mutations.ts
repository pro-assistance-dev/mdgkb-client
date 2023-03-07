import { MutationTree } from 'vuex';

import ValueType from '@/services/classes/ValueType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ValueType[]) {
    state.items = items.map((i: ValueType) => new ValueType(i));
  },
};

export default mutations;
