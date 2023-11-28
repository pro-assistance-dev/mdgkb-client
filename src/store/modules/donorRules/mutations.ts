import { MutationTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: DonorRule[]) {
    state.items.donorRules = items.map((i: DonorRule) => new DonorRule(i));
    state.items.donorRulesForDelete = [];
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
