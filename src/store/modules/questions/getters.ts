import { GetterTree } from 'vuex';

import Question from '@/classes/Question';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  question(state): Question {
    return state.question;
  },
  allLoaded(state): boolean {
    return state.allLoaded;
  },
};

export default getters;
