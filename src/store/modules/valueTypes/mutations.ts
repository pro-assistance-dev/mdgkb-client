import { MutationTree } from 'vuex';

import ValueType from '@/classes/ValueType';
import IValueType from '@/interfaces/IValueType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IValueType[]) {
    state.items = items.map((i: IValueType) => new ValueType(i));
  },
};

export default mutations;
