import { MutationTree } from 'vuex';

import CandidateExam from '@/classes/CandidateExam';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(CandidateExam),
};

export default mutations;
