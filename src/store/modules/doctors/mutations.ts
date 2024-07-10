import { MutationTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Doctor),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
