import { MutationTree } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseMutations from '@/services/store/baseModule/baseMutations';
import { getDefaultState } from '@/store/modules/news';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Employee, State>(Employee),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
