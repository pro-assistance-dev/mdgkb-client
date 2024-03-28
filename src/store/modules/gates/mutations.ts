import { MutationTree } from 'vuex';

import Gate from '@/classes/Gate';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Gate),
};

export default mutations;
