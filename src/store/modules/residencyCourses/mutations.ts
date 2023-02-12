import { MutationTree } from 'vuex';

import ResidencyCourse from '@/classes/ResidencyCourse';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(ResidencyCourse),
  clearItems(state) {
    state.items = [];
  },
};

export default mutations;
