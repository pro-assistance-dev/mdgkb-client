import { MutationTree } from 'vuex';

import HospitalizationType from '@/classes/HospitalizationType';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(HospitalizationType),
};

export default mutations;
