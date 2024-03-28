import { MutationTree } from 'vuex';

import EducationalAcademic from '@/classes/EducationalAcademic';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(EducationalAcademic),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
