import { MutationTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';

import getBaseMutations from '@/services/store/baseModule/baseMutations';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DonorRule, State>(DonorRule),
};

export default mutations;
