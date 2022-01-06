import { MutationTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import IDonorRule from '@/interfaces/IDonorRule';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDonorRule[]) {
    state.items.donorRules = items.map((i: IDonorRule) => new DonorRule(i));
    state.items.donorRulesForDelete = [];
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
