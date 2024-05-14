import { MutationTree } from 'vuex';

import EducationYear from '@/classes/EducationYear';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<EducationYear, State>(EducationYear),
};

export default mutations;
