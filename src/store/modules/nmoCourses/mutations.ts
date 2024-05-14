import { MutationTree } from 'vuex';

import NmoCourse from '@/classes/NmoCourse';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(NmoCourse),
};

export default mutations;
