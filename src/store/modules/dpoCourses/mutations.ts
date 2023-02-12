import { MutationTree } from 'vuex';

import DpoCourse from '@/classes/DpoCourse';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DpoCourse),
};

export default mutations;
