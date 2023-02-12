import { GetterTree } from 'vuex';

import ICandidateExam from '@/interfaces/ICandidateExam';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
};

export default getters;
