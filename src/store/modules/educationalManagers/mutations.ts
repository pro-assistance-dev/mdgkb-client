import { MutationTree } from 'vuex';

import EducationalManager from '@/classes/EducationalManager';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(EducationalManager),
};

export default mutations;
