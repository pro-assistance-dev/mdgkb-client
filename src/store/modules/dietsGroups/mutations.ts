import { MutationTree } from 'vuex';

import DietGroup from '@/classes/DietGroup';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DietGroup, State>(DietGroup),
};

export default mutations;
