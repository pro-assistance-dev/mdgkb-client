import { MutationTree } from 'vuex';

import Teacher from '@/classes/Teacher';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Teacher, State>(Teacher),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
