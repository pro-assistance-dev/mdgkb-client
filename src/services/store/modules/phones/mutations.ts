import { MutationTree } from 'vuex';

import Phone from '@/services/classes/Phone';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Phone, State>(Phone),
};

export default mutations;
