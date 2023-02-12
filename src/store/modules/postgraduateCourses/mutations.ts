import { MutationTree } from 'vuex';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(PostgraduateCourse),
  clearItems(state) {
    state.items = [];
  },
};

export default mutations;
