import { MutationTree } from 'vuex';

import Banner from '@/classes/Banner';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Banner),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
