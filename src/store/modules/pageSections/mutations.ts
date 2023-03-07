import { MutationTree } from 'vuex';

import PageSection from '@/services/classes/page/PageSection';
import getBaseMutations from '@/store/baseModule/baseMutations';
import { getDefaultState } from '@/store/modules/pageSections/index';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PageSection, State>(PageSection),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
