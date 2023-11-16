import { MutationTree } from 'vuex';

import Vacancy from '@/classes/Vacancy';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Vacancy),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
