import { MutationTree } from 'vuex';

import Specialization from '@/classes/Specialization';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Specialization, State>(Specialization),
};

export default mutations;
