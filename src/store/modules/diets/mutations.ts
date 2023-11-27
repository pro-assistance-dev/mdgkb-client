import { MutationTree } from 'vuex';

import Diet from '@/classes/Diet';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Diet, State>(Diet),
};

export default mutations;
