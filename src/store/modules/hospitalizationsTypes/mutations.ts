import { MutationTree } from 'vuex';

import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(HospitalizationType),
};

export default mutations;
