import { MutationTree } from 'vuex';

import MedicalProfile from '@/classes/MedicalProfile';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(MedicalProfile),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
