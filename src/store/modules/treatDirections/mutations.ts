import { MutationTree } from 'vuex';

import TreatDirection from '@/classes/TreatDirection';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<TreatDirection, State>(TreatDirection),
};

export default mutations;
