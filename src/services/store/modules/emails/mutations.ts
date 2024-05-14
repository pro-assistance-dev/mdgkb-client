import { MutationTree } from 'vuex';

import Email from '@/services/classes/Email';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Email, State>(Email),
};

export default mutations;
